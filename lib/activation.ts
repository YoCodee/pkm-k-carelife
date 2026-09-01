// Checksum validation function
export function isValidActivationCode(code: string): boolean {
  const cleanCode = code.toUpperCase().trim();
  const match = cleanCode.match(/^CL-(\d{4})$/);
  if (!match) return false;
  
  const digits = match[1];
  const A = parseInt(digits[0]);
  const B = parseInt(digits[1]);
  const C = parseInt(digits[2]);
  const D = parseInt(digits[3]);
  
  // Math validation equations (1/70 probability)
  const check1 = (A * 7 + B * 3 + C * 9 + D * 1) % 10 === 5;
  const check2 = (A + B + C + D) % 7 === 2;
  
  return check1 && check2;
}

// Function to generate 50 valid codes and save them to public/KODE_AKTIVASI.txt
export function generateActivationCodesFile() {
  // Only run this on the server-side Node.js environment
  if (typeof window !== "undefined") return;

  try {
    const fs = require("fs");
    const path = require("path");

    const targetDir = path.join(process.cwd(), "public");
    const targetPath = path.join(targetDir, "KODE_AKTIVASI.txt");

    // Don't recreate if it already exists
    if (fs.existsSync(targetPath)) return;

    const validCodes: string[] = [];

    // Search for 50 valid codes
    for (let num = 1000; num <= 9999; num++) {
      const code = `CL-${num}`;
      if (isValidActivationCode(code)) {
        validCodes.push(code);
        if (validCodes.length === 50) break;
      }
    }

    // Write to public/KODE_AKTIVASI.txt so it's accessible and downloadable
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    const fileContent = `=====================================================
DAFTAR KODE AKTIVASI BUKU CARELIFE (50 KODE)
=====================================================
Gunakan kode-kode di bawah ini untuk dicetak pada buku fisik CareLife.
Satu buku menggunakan satu kode unik.

${validCodes.join("\n")}
=====================================================`;

    fs.writeFileSync(targetPath, fileContent, "utf-8");
    console.log(`[Activation] Generated 50 valid codes to ${targetPath}`);
  } catch (error) {
    console.error("[Activation] Failed to generate activation codes file:", error);
  }
}
