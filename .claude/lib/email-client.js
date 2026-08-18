/**
 * Email Client - Conecta a Outlook y Gmail APIs reales
 * Lee, procesa y analiza correos legales
 */

class EmailClient {
  constructor(provider, token, config) {
    this.provider = provider;
    this.token = token;
    this.config = config;
    this.accessToken = token.access_token;

    if (provider === 'outlook') {
      this.apiBase = 'https://graph.microsoft.com/v1.0';
    } else if (provider === 'gmail') {
      this.apiBase = 'https://www.googleapis.com/gmail/v1';
    }
  }

  /**
   * Obtiene headers HTTP con autenticación
   */
  getHeaders() {
    return {
      'Authorization': `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json'
    };
  }

  /**
   * ========== OUTLOOK (Microsoft Graph API) ==========
   */

  async getOutlookEmails(folderId = 'inbox', limit = 10) {
    const filter = "$select=id,subject,from,receivedDateTime,bodyPreview,hasAttachments";
    const orderby = "$orderby=receivedDateTime desc";
    const top = `$top=${limit}`;

    const url = `${this.apiBase}/me/mailFolders/${folderId}/messages?${filter}&${orderby}&${top}`;

    try {
      const response = await fetch(url, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`Outlook API error: ${response.status}`);
      }

      const data = await response.json();
      return data.value || [];
    } catch (error) {
      console.error('Error fetching Outlook emails:', error);
      throw error;
    }
  }

  async getOutlookEmailBody(emailId) {
    const url = `${this.apiBase}/me/messages/${emailId}?$select=id,subject,from,body`;

    try {
      const response = await fetch(url, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`Outlook API error: ${response.status}`);
      }

      const data = await response.json();
      return {
        id: data.id,
        subject: data.subject,
        from: data.from?.emailAddress?.address,
        content: data.body?.content || ''
      };
    } catch (error) {
      console.error('Error fetching Outlook email body:', error);
      throw error;
    }
  }

  async getOutlookAttachments(emailId) {
    const url = `${this.apiBase}/me/messages/${emailId}/attachments`;

    try {
      const response = await fetch(url, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`Outlook API error: ${response.status}`);
      }

      const data = await response.json();
      return data.value || [];
    } catch (error) {
      console.error('Error fetching Outlook attachments:', error);
      throw error;
    }
  }

  async searchOutlookEmails(query, limit = 10) {
    const filter = encodeURIComponent(query);
    const url = `${this.apiBase}/me/messages?$search="${filter}"&$top=${limit}`;

    try {
      const response = await fetch(url, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`Outlook search error: ${response.status}`);
      }

      const data = await response.json();
      return data.value || [];
    } catch (error) {
      console.error('Error searching Outlook emails:', error);
      throw error;
    }
  }

  /**
   * ========== GMAIL (Gmail API) ==========
   */

  async getGmailEmails(label = 'INBOX', limit = 10) {
    const query = encodeURIComponent('is:unread');
    const url = `${this.apiBase}/users/me/messages?labelIds=${label}&q=${query}&maxResults=${limit}`;

    try {
      const response = await fetch(url, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`Gmail API error: ${response.status}`);
      }

      const data = await response.json();
      const messages = data.messages || [];

      // Obtener detalles completos de cada mensaje
      return await Promise.all(
        messages.map(msg => this.getGmailEmailDetails(msg.id))
      );
    } catch (error) {
      console.error('Error fetching Gmail emails:', error);
      throw error;
    }
  }

  async getGmailEmailDetails(messageId) {
    const url = `${this.apiBase}/users/me/messages/${messageId}?format=full`;

    try {
      const response = await fetch(url, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`Gmail API error: ${response.status}`);
      }

      const data = await response.json();
      const headers = data.payload.headers;

      const getHeader = (name) => headers.find(h => h.name === name)?.value || '';

      return {
        id: data.id,
        subject: getHeader('Subject'),
        from: getHeader('From'),
        date: getHeader('Date'),
        content: this.getGmailContent(data.payload),
        attachments: data.payload.parts?.filter(p => p.filename) || []
      };
    } catch (error) {
      console.error('Error fetching Gmail email details:', error);
      throw error;
    }
  }

  getGmailContent(payload) {
    if (payload.mimeType === 'text/plain' || payload.mimeType === 'text/html') {
      if (payload.body.data) {
        return Buffer.from(payload.body.data, 'base64').toString('utf8');
      }
    }

    if (payload.parts) {
      for (const part of payload.parts) {
        if (part.mimeType === 'text/plain' || part.mimeType === 'text/html') {
          if (part.body.data) {
            return Buffer.from(part.body.data, 'base64').toString('utf8');
          }
        }
      }
    }

    return '';
  }

  async searchGmailEmails(query, limit = 10) {
    const q = encodeURIComponent(query);
    const url = `${this.apiBase}/users/me/messages?q=${q}&maxResults=${limit}`;

    try {
      const response = await fetch(url, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`Gmail search error: ${response.status}`);
      }

      const data = await response.json();
      const messages = data.messages || [];

      return await Promise.all(
        messages.map(msg => this.getGmailEmailDetails(msg.id))
      );
    } catch (error) {
      console.error('Error searching Gmail emails:', error);
      throw error;
    }
  }

  /**
   * ========== MÉTODOS COMUNES ==========
   */

  /**
   * Obtiene correos recientes de forma agnóstica
   */
  async getRecentEmails(limit = 10) {
    if (this.provider === 'outlook') {
      return await this.getOutlookEmails('inbox', limit);
    } else if (this.provider === 'gmail') {
      return await this.getGmailEmails('INBOX', limit);
    }
  }

  /**
   * Busca correos por palabras clave
   */
  async searchEmails(keywords, limit = 10) {
    const query = keywords.join(' OR ');

    if (this.provider === 'outlook') {
      return await this.searchOutlookEmails(query, limit);
    } else if (this.provider === 'gmail') {
      return await this.searchGmailEmails(query, limit);
    }
  }

  /**
   * Obtiene cuerpo completo del correo
   */
  async getEmailBody(emailId) {
    if (this.provider === 'outlook') {
      return await this.getOutlookEmailBody(emailId);
    } else if (this.provider === 'gmail') {
      return await this.getGmailEmailDetails(emailId);
    }
  }

  /**
   * Obtiene adjuntos del correo
   */
  async getAttachments(emailId) {
    if (this.provider === 'outlook') {
      return await this.getOutlookAttachments(emailId);
    } else if (this.provider === 'gmail') {
      const email = await this.getGmailEmailDetails(emailId);
      return email.attachments;
    }
  }
}

module.exports = EmailClient;
