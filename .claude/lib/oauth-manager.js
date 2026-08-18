/**
 * OAuth2 Manager - Manejo seguro de autenticación y tokens
 * Soporta Microsoft 365 (Outlook) y Google (Gmail)
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const os = require('os');

class OAuthManager {
  constructor(configPath) {
    this.config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    this.tokenDir = this.expandPath(this.config.tokenStorage.location);
    this.ensureTokenDirExists();
  }

  expandPath(filepath) {
    if (filepath.startsWith('${HOME}')) {
      return filepath.replace('${HOME}', os.homedir());
    }
    return filepath;
  }

  ensureTokenDirExists() {
    if (!fs.existsSync(this.tokenDir)) {
      fs.mkdirSync(this.tokenDir, { recursive: true, mode: 0o700 });
    }
  }

  /**
   * Genera URL de autorización para comenzar flujo OAuth2
   */
  getAuthorizationUrl(provider, state) {
    if (provider === 'outlook') {
      return this.getMicrosoftAuthUrl(state);
    } else if (provider === 'gmail') {
      return this.getGoogleAuthUrl(state);
    }
    throw new Error(`Proveedor desconocido: ${provider}`);
  }

  getMicrosoftAuthUrl(state) {
    const config = this.config.microsoft;
    const clientId = this.resolveSecret(config.clientId);
    const redirectUri = config.redirectUri;
    const scopes = config.scopes.join('%20');

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: scopes,
      state: state,
      response_mode: 'query'
    });

    return `${config.authorizationEndpoint}?${params.toString()}`;
  }

  getGoogleAuthUrl(state) {
    const config = this.config.google;
    const clientId = this.resolveSecret(config.clientId);
    const redirectUri = config.redirectUri;
    const scopes = config.scopes.join('%20');

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: scopes,
      state: state,
      access_type: 'offline'
    });

    return `${config.authorizationEndpoint}?${params.toString()}`;
  }

  /**
   * Intercambia código de autorización por tokens
   */
  async exchangeCodeForToken(provider, authCode) {
    if (provider === 'outlook') {
      return await this.exchangeMicrosoftCode(authCode);
    } else if (provider === 'gmail') {
      return await this.exchangeGoogleCode(authCode);
    }
    throw new Error(`Proveedor desconocido: ${provider}`);
  }

  async exchangeMicrosoftCode(authCode) {
    const config = this.config.microsoft;
    const clientId = this.resolveSecret(config.clientId);
    const clientSecret = this.resolveSecret(config.clientSecret);

    const params = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code: authCode,
      redirect_uri: config.redirectUri,
      grant_type: 'authorization_code'
    });

    const response = await fetch(config.tokenEndpoint, {
      method: 'POST',
      body: params,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OAuth error: ${error.error} - ${error.error_description}`);
    }

    return await response.json();
  }

  async exchangeGoogleCode(authCode) {
    const config = this.config.google;
    const clientId = this.resolveSecret(config.clientId);
    const clientSecret = this.resolveSecret(config.clientSecret);

    const params = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code: authCode,
      redirect_uri: config.redirectUri,
      grant_type: 'authorization_code'
    });

    const response = await fetch(config.tokenEndpoint, {
      method: 'POST',
      body: params,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OAuth error: ${error.error} - ${error.error_description}`);
    }

    return await response.json();
  }

  /**
   * Guarda tokens de forma encriptada
   */
  saveToken(provider, email, token) {
    const tokenFile = path.join(this.tokenDir, `${provider}-${email}.encrypted`);
    const encrypted = this.encryptToken(token);
    fs.writeFileSync(tokenFile, encrypted, { mode: 0o600 });
    console.log(`✅ Token guardado de forma segura para ${email}`);
  }

  /**
   * Carga y desencripta tokens
   */
  loadToken(provider, email) {
    const tokenFile = path.join(this.tokenDir, `${provider}-${email}.encrypted`);
    if (!fs.existsSync(tokenFile)) {
      return null;
    }
    const encrypted = fs.readFileSync(tokenFile, 'utf8');
    return this.decryptToken(encrypted);
  }

  /**
   * Encripta tokens con AES-256-GCM
   */
  encryptToken(token) {
    const algorithm = 'aes-256-gcm';
    const key = this.getDerivedKey();
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(JSON.stringify(token), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag();

    const result = {
      iv: iv.toString('hex'),
      tag: authTag.toString('hex'),
      data: encrypted
    };

    return JSON.stringify(result);
  }

  /**
   * Desencripta tokens
   */
  decryptToken(encryptedData) {
    const algorithm = 'aes-256-gcm';
    const key = this.getDerivedKey();
    const { iv, tag, data } = JSON.parse(encryptedData);

    const decipher = crypto.createDecipheriv(
      algorithm,
      key,
      Buffer.from(iv, 'hex')
    );
    decipher.setAuthTag(Buffer.from(tag, 'hex'));

    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return JSON.parse(decrypted);
  }

  /**
   * Deriva clave de encriptación del sistema
   */
  getDerivedKey() {
    const salt = Buffer.from('jac-legal-system-2026', 'utf8');
    const password = process.env.JAC_ENCRYPTION_KEY || this.getSystemKey();
    return crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
  }

  /**
   * Obtiene clave del sistema (fallback seguro)
   */
  getSystemKey() {
    const keyFile = path.join(os.homedir(), '.config', 'jac', '.encryption-key');
    if (fs.existsSync(keyFile)) {
      return fs.readFileSync(keyFile, 'utf8').trim();
    }
    const key = crypto.randomBytes(32).toString('hex');
    fs.mkdirSync(path.dirname(keyFile), { recursive: true, mode: 0o700 });
    fs.writeFileSync(keyFile, key, { mode: 0o600 });
    return key;
  }

  /**
   * Refresca tokens usando refresh token
   */
  async refreshToken(provider, email) {
    const token = this.loadToken(provider, email);
    if (!token || !token.refresh_token) {
      throw new Error(`No refresh token disponible para ${email}`);
    }

    if (provider === 'outlook') {
      return await this.refreshMicrosoftToken(token);
    } else if (provider === 'gmail') {
      return await this.refreshGoogleToken(token);
    }
  }

  async refreshMicrosoftToken(oldToken) {
    const config = this.config.microsoft;
    const clientId = this.resolveSecret(config.clientId);
    const clientSecret = this.resolveSecret(config.clientSecret);

    const params = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: oldToken.refresh_token,
      grant_type: 'refresh_token'
    });

    const response = await fetch(config.tokenEndpoint, {
      method: 'POST',
      body: params,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Token refresh failed: ${error.error}`);
    }

    return await response.json();
  }

  async refreshGoogleToken(oldToken) {
    const config = this.config.google;
    const clientId = this.resolveSecret(config.clientId);
    const clientSecret = this.resolveSecret(config.clientSecret);

    const params = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: oldToken.refresh_token,
      grant_type: 'refresh_token'
    });

    const response = await fetch(config.tokenEndpoint, {
      method: 'POST',
      body: params,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Token refresh failed: ${error.error}`);
    }

    return await response.json();
  }

  /**
   * Resuelve secretos desde variables de entorno o archivos
   */
  resolveSecret(secret) {
    if (secret.startsWith('${') && secret.endsWith('}')) {
      const envVar = secret.slice(2, -1);
      const value = process.env[envVar];
      if (!value) {
        throw new Error(
          `Variable de entorno no configurada: ${envVar}\n` +
          `Configura con: export ${envVar}="tu-valor"`
        );
      }
      return value;
    }
    return secret;
  }

  /**
   * Verifica si token está expirado
   */
  isTokenExpired(token) {
    if (!token.expires_at) return true;
    return Date.now() > token.expires_at * 1000;
  }

  /**
   * Obtiene token válido (refresca si es necesario)
   */
  async getValidToken(provider, email) {
    let token = this.loadToken(provider, email);
    if (!token) {
      throw new Error(`No token found for ${email}`);
    }

    if (this.isTokenExpired(token)) {
      console.log(`🔄 Refrescando token para ${email}...`);
      token = await this.refreshToken(provider, email);
      this.saveToken(provider, email, token);
    }

    return token;
  }
}

module.exports = OAuthManager;
