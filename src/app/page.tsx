import { log } from "console";
import Image from 'next/image';
import Link from "next/link";


export type Country = {
  name: {
    common: string;
  };

  translations: {
    por: {
      common: string;
      subregion: string
      capital: string
    }
  };

  flags: {
    svg: string;
    alt: string;
  };

  capital: string;
  subregion: string;
  population: number;
  languages?: string;
}

async function getCountries(): Promise<Country[]> {
  const response = await fetch("https://restcountries.com/v3.1/all");
  return response.json();
}

export default async function Home() {
  const countries = await getCountries();

  // console.log(countries);

  return (
    <section className="grid grid-cols-5 w-full container gap-2 mt-16">
      {countries.map((country) => (
        <Link href={`country/${country.name.common}`}>
          <article className="h-64 min-2-full p-2 bg-[#101010] rounded-md hover:shadow-xl transition-all" key={country.name.common}>
            <div className="relative w-full h-40 p-2 overflow-hidden rounded-md">
              <Image
                fill
                src={country.flags.svg}
                alt={country.flags.alt}
                className="object-cover"
              />
            </div>
            <h1 className="font-bold text-lg text-center pt-2">{country.translations.por.common}</h1>
          </article>
        </Link>
      ))}
    </section>
  );
}
