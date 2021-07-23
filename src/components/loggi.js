//näppärämpi tapa kirjoittaa console.log() ja tekee sun consolet selkeämmiksi muista ilmoituksista

export default function loggi(text, options) {
  console.log(
    `%c${text},${options}`,
    "color: #0B0; font-weight: bold; font-size: 16px; padding: 2px 20px 2px 10px; margin: 0; font-family: lucida console;"
  );
}
