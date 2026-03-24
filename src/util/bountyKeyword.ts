export function generateBountyKeyword() {
  const consonants = 'BCDFGHJKLMPQRSTVWXYZ';
  const vowels = 'AEIOU';
  let keyword = '';

  for (let i = 0; i < 3; i++) {
    const randomC = consonants[Math.floor(Math.random() * consonants.length)];
    const randomV = vowels[Math.floor(Math.random() * vowels.length)];
    keyword += randomC + randomV;
  }

  return keyword;
}
