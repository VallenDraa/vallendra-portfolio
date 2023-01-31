/* This will be the list of messages that can be displayed in the index page of the api route */
const messages = [
  "Do you get to this part of the site very often? What am i saying of course you don't.",
  "The API has the right responses, if you have the data.",
  "You're not supposed to be here !",
  "Never Should have come here !",
  "No Lollygagging",
  "I used to snoop around like you, then I got my pc hacked.",
];

export default function getRandomMessage() {
  const idx = Math.floor(Math.random() * messages.length);

  return messages[idx];
}
