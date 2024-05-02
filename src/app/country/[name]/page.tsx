import type { Country } from "@/app/page";
import Link from "next/link";
import Image from 'next/image';

async function getCountryByName(name: string): Promise<Country> {
  const respose = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
  return (await respose.json())[0]; // (await ... )[0] para retornar a posição 0 da array
}


export default async function CountryPage({ params: { name } }: { params: { name: string } }) {
  const country = await getCountryByName(name);
  const formatter = Intl.NumberFormat("en", {notation: "compact"})

  console.log(country);


  return (
    <section className="container flex flex-col">
      <h1 className="text-4xl text-white text-center font-bold py-16">{country.translations.por.common}</h1>
      <Link href="/" className="flex py-2">
        <Image
          width={24}
          height={24}
          src="/country/Arrow-left.svg"
          alt="voltar"
        />
        Voltar
      </Link>
      <article className="flex justify-between min-w-full bg-[#101010] p-10 rounded-md">
        <section className="">
          <div className="flex py-1">
            <Image
              width={30}
              height={30}
              src="/country/capital.svg"
              alt="capital"
              className="pr-2"
            />
            <h2 className="text-xl">
              <b>Capital:</b> - {country.capital}
            </h2>
          </div>
          <div className="flex py-1">
            <Image
              width={30}
              height={30}
              src="/country/world-map.svg"
              alt="continente"
              className="pr-2"
            />
            <h2 className="text-xl">
              <b>Continente:</b> - {country.subregion}
            </h2>
          </div>
          <div className="flex py-1">
            <Image
              width={30}
              height={30}
              src="/country/population.svg"
              alt="população"
              className="pr-2"
            />
            <h2 className="text-xl">
              <b>População:</b> - {formatter.format(country.population)}
            </h2>
          </div>
          {country.languages && (
            <div className="flex items-baseline py-1">
              <Image
                width={30}
                height={30}
                src="/country/language.svg"
                alt="idioma"
                className="pr-2"
              />
              <h2 className="text-xl">
                <b>Línguas faladas:</b>
                <br />
                {Object.values(country.languages).map((languages => (
                  <span key={languages} className="text-sm inline-block mb-1 py-0.5 px-2 bg-[#004f92] rounded-2xl mr-2">{languages}</span>
                )))}
              </h2>
            </div>
          )}
        </section>
        <div className="relative h-auto w-96">
          <Image 
            src={country.flags.svg}
            alt={country.flags.alt}
            fill
            className="object-cover rounded-md shadow-xl"
          />
        </div>
      </article>
    </section>
  )
}