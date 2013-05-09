package com.zuhlke.angularjs.auth;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AuthenticationToken {

	final Logger logger = LoggerFactory.getLogger(AuthenticationToken.class);

	private final byte[] key = new byte[] {
		(byte) -52, (byte) -62, (byte) -14, (byte) -92, (byte) 112, 
		(byte) 7, (byte) -90, (byte) 124, (byte) 110, (byte) -40, (byte) -45, 
		(byte) -86, (byte) -111, (byte) -10, (byte) -98, (byte) -64
	};
	
	private String username;
	private String password;

	public AuthenticationToken(String username, String password) {
		this.username = username;
		this.password = password;
	}

	public AuthenticationToken(String token) throws AuthenticationException {
		try {
			SecretKeySpec keySpec = new SecretKeySpec(key, "AES");
			Cipher aesCipher = Cipher.getInstance("AES");
			aesCipher.init(Cipher.DECRYPT_MODE, keySpec);
			String decryptedString = new String(aesCipher.doFinal(Base64.decodeBase64(token)), "UTF-8");
			String[] split = decryptedString.split(":");
			this.username = split[0];
			this.password = split[1];

		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			throw new AuthenticationException(e.getMessage(), e);
		}
	}

	public String toEncyptedToken() throws AuthenticationException {
		try {
			SecretKeySpec keySpec = new SecretKeySpec(key, "AES");
			Cipher aesCipher = Cipher.getInstance("AES");
			aesCipher.init(Cipher.ENCRYPT_MODE, keySpec);
			String token = username + ":" + password;
			return Base64.encodeBase64String(aesCipher.doFinal(token.getBytes("UTF-8")));

		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			throw new AuthenticationException(e.getMessage(), e);
		}
	}

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}

}
