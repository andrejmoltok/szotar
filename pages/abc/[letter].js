import { useRouter } from 'next/router';
import Link from 'next/link';
import szotar from '../api/szotar';

export default function LetterPage({ entries }) {
  const router = useRouter();
  const { letter } = router.query;
  const alphabet = "aábcdeéfghiíjklmnoóöőpqrstuúüűvwxyz".split("");
  // Render the entries list
  return (
    <>
    <div>
    {alphabet.map((letter, index) => (
      <Link key={index} href={`/abc/${letter}`}>
        {letter.toUpperCase()}
      </Link>
    ))}
    </div>
    <div>
      <h1>{letter.toUpperCase()}</h1>
      <ul>
        {entries.sort((a,b) => a.halan.localeCompare(b.halan)).map((entry, index) => (
          <li key={`${letter}-${index}`}>{entry.halan}</li>
        ))}
      </ul>
    </div>
  </>
  );
}

// This function will be called at build time
export async function getStaticPaths() {
  // Get the unique first letters of all entries in the szotar.json file
  const firstLetters = [...new Set(szotar.map((entry) => entry.halan.charAt(0)))];

  // Create an array of paths with the unique first letters
  const paths = firstLetters.map((letter) => ({
    params: { letter },
  }));

  // Return the paths object to Next.js
  return { paths, fallback: true };
}

// This function will be called at build time for each unique first letter
export async function getStaticProps({ params }) {
  // Get all the entries that start with the first letter from szotar.json file
  const entries = szotar.filter((entry) => entry.halan.charAt(0).toLowerCase() === params.letter.toLowerCase());
  
  // Return the entries as props to the LetterPage component
  return { props: { entries } };
}