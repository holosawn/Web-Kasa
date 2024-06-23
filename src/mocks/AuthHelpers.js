
async function createHmac(algorithm, secret) {
    let data = '';
  
    const pad = (s) => {
      return s.length % 64 === 0 ? s : pad(s + ' ');
    };
  
    const blockSize = 64;
    const opad = '5c5c5c5c5c5c5c5c';
    const ipad = '3636363636363636';
  
    const innerHash = async (data) => {
      const paddedData = pad(data);
      const blockCount = Math.ceil(paddedData.length / blockSize);
      const blocks = new Array(blockCount).fill('').map((_, i) => {
        const start = i * blockSize;
        const end = Math.min(start + blockSize, paddedData.length);
        return paddedData.substring(start, end);
      });
  
      let hmac = await crypto.subtle.digest(algorithm, new TextEncoder().encode(secret));
      for (const block of blocks) {
        hmac = await crypto.subtle.digest(algorithm, new TextEncoder().encode(hmac + block));
      }
  
      return hmac;
    };
  
    const outerHash = async (hmac) => {
      const block = new TextEncoder().encode(opad + hmac);
      return await crypto.subtle.digest(algorithm, block);
    };
  
    return {
      update: (chunk) => {
        data += chunk;
      },
      digest: async (encoding) => {
        const innerHmac = await innerHash(data);
        const outerHmac = await outerHash(innerHmac);
        let signature;
  
        switch (encoding) {
          case 'hex':
            signature = Array.from(new Uint8Array(outerHmac))
              .map((b) => b.toString(16).padStart(2, '0'))
              .join('');
            break;
          case 'base64':
            signature = btoa(String.fromCharCode.apply(null, new Uint8Array(outerHmac)));
            break;
          default:
            throw new Error(`Unsupported encoding: ${encoding}`);
        }
  
        return signature;
      },
    };
  }
  
  const base64url = (str) => {
      return btoa(str)
  };
  
  const base64urlDecode = (str) => {
  return atob(str)
  };
  
  const generateToken = async (payload, secret, expiresIn = 60) => {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };

  
    const payloadWithExp = {
      ...payload,
      exp: Math.floor(Date.now() / 1000) + (expiresIn * 60)
    };
  
    const headerBase64 = base64url(JSON.stringify(header));
    const payloadBase64 = base64url(JSON.stringify(payloadWithExp));
  
     
    const hmac = await createHmac('SHA-256', secret);
    hmac.update(`${headerBase64}.${payloadBase64}`);
    const signatureBase64 = await hmac.digest('base64');
    
    return `${headerBase64}.${payloadBase64}.${signatureBase64}`;
  };
  
  // Verifying token by comparing signatures and returns user if its verified
  export const verifyToken = async (token, secret) => {
    if (token) {
        const [headerBase64, payloadBase64, signatureBase64] = token.split('.');
        let signatureCheck = await createHmac('SHA-256', secret);
        signatureCheck.update(`${headerBase64}.${payloadBase64}`);
        signatureCheck = await signatureCheck.digest('base64');
  
        if (signatureBase64 !== signatureCheck) {
          throw new Error('Invalid signature');
        }
      
        const payload = JSON.parse(base64urlDecode(payloadBase64));
      
        if (payload.exp < Math.floor(Date.now() / 1000)) {
          throw new Error('Token Expired');
        }
      
        return payload;
    }
    else{
        throw new Error('Null Token')
    }
  };

  
  export const generateAccessToken = (user, secret) => {
  return generateToken(user, secret, 15); // 15 minutes expiry
  };
  
  export const generateRefreshToken = (user, secret) => {
  return generateToken(user, secret, 1440); // 24 hours expiry
  };
  
  export const extractPayloadFromToken = async (token, secret) => {
    if (token) {
        const [headerBase64, payloadBase64, signatureBase64] = token.split('.');
        let signatureCheck = await createHmac('SHA-256', secret);
        signatureCheck.update(`${headerBase64}.${payloadBase64}`);
        signatureCheck = await signatureCheck.digest('base64');
  
        if (signatureBase64 !== signatureCheck) {
          throw new Error('Invalid signature');
        }
      
        const payload = JSON.parse(base64urlDecode(payloadBase64));
      
        return payload;
    }
    else{
        throw new Error('Null Token')
    }
  };