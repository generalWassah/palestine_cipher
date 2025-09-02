# palestine_cipher
🔐 Palestine Cipher

The Palestine Cipher is a modern symmetric encryption scheme that extends the classical Vigenère cipher with advanced diffusion and non-periodic key generation. It introduces the Palestine Key and the NEWS functions (North, East, West, South), combined in three enhancements: Alpha, Beta, and Gamma.

✨ Enhancements

Alpha

Generates a non-periodic Palestine Key from the Vigenère key.

Encryption is Vigenère-style but with the expanded key.

Beta

Applies NEWS diffusion to the plaintext (without breaking into blocks).

Uses a simple repeated Vigenère key.

Gamma (Optimized Implementation)

Combines Alpha + Beta.

Plaintext is diffused using NEWS functions, and the key is expanded iteratively.

Ciphertext achieves randomness with index of coincidence ≈ 1/26.

Efficient design avoids large matrix computations.

📊 Comparison
Feature	Vigenère Cipher	Alpha (Palestine Key)	Beta (NEWS Diffusion)	Gamma (Alpha + Beta)
Key Expansion	Periodic repetition	Non-periodic expansion	Repeated key	Non-periodic expansion
Plaintext Diffusion	None	None	NEWS functions applied	NEWS functions applied
Avalanche Effect	Weak	Moderate	Strong	Very Strong
Resistance to Attack	Vulnerable to frequency analysis	Resistant to key length attacks	Resistant to frequency analysis	Resistant to both
Randomness (IC)	High deviation from random	Closer to random	Closer to random	≈ 1/26 (near random)
📖 Process

Diffusion – Plaintext transformed with NEWS functions.

Key Expansion – Short key expanded into a long non-periodic Palestine Key.

Encryption – Vigenère-style combination of diffused plaintext and expanded key.

Decryption – Reverse process to recover plaintext.

🌍 Live Demo

Try it here:
🔗 palestineguard.w3spaces.com
