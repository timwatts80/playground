import { createClient } from 'contentful';

var contentful = require('contentful');

var client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  client.getEntries().then(function (entries) {
    // log the title for all the entries that have it
    entries.items.forEach(function (entry) {
      if (entry.fields.productName) {
        console.log(entry.fields.productName);
      }
    });
  });

  export default function Home({ products }) {
    return (
      <div>
        <h1>Products</h1>
      </div>
    );
  }