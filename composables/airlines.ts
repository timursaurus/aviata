export async function useFetchAirlineLogo(airlineCode: Uppercase<string>) {
  const logos = ref<Record<string, string>>({ });

  if (logos.value[airlineCode]) {
    return logos.value[airlineCode];
  }

  const { data } = useFetch<string>(
    `https://aviata.kz/static/airline-logos/80x80/${airlineCode}.png`,
    {
      method: "GET",
      mode: "no-cors"
    }
  );
  if (data.value) {
    logos.value[airlineCode] = data.value
    return data
  }

}
