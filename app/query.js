export const QUERY = `*[_type=="landing"][0]{
  eyebrow, title, aboutTitle, aboutAccent, aboutText,
  services[]{t,d,h,p}, features, reviews[]{a,t},
  "photos": photos[].asset->url, phone, telegram, address, hours
}`;
