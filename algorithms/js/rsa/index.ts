import { isPrime } from 'mathjs';


const exgcd = (a: bigint, b: bigint): [bigint, bigint, bigint] => {
  if (a == 0n) {
    return [b, 0n, 1n];
  } else {
    const [gcd, x, y] = exgcd(b % a, a);

    return [gcd, y - (~~(b / a)) * x, x]
  }
}


const generatePrime = () => {
  let prime = 1;

  while (!isPrime(prime)) {
    prime = ~~(Math.random() * 1e20);
  }

  return BigInt(prime);
}

const expmod = (base: bigint, exp: bigint, mod: bigint): bigint => {
  if (exp === 0n) return 1n;

  if (exp % 2n == 0n) {
    const halfed = expmod(base, (exp / 2n), mod);

    return halfed * halfed % mod;
  } else {
    return (base * expmod(base, (exp - 1n), mod)) % mod;
  }
}


export class RSA {
  public n: bigint = 0n;
  public e: bigint = 65537n;

  private p: bigint = 0n;
  private q: bigint = 0n;
  private d: bigint = 0n;

  constructor({ p, q, e }: {
    p?: bigint,
    q?: bigint,
    e?: bigint,
  }) {
    if (!p) {
      this.p = generatePrime();
    }

    if (!q) {
      this.q = generatePrime();
    }

    if (e) {
      this.e = e;
    }

    this.n = this.p * this.q;

    let fi = (this.p - 1n) * (this.q - 1n);

    const [_, x] = exgcd(this.e, fi);
    this.d = (x + fi) % fi;

console.log(`
RSA system construct:
  p: ${this.p}
  q: ${this.q}
  e: ${this.e}

  n = pq: ${this.n} 
  fi(n) = (p-1)(q-1): ${fi}

  d * e = 1 (mod fi)
  d: ${this.d}
`)
  }

  encode(message: bigint) {
    if (message >= this.n) {
      throw new Error('Message is bigger than n');
    }

    return expmod(message, this.e, this.n);
  }

  decode(cipher: bigint) {
    return expmod(cipher, this.d, this.n);
  }
}

const rsa = new RSA({});
const message = 0xfabn;
const ciphertext = rsa.encode(message);
console.log('Message', message);
console.log('Encoded', rsa.encode(message));
console.log('Decoded', rsa.decode(ciphertext));