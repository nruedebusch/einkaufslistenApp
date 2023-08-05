<script lang="ts">
  import { onValue, push, remove, ref } from "firebase/database";
  import { shoppingListInDB, database } from "../config/firebaseConfig.js";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let inputValue: string = "";
  let shoppingList: [string, string][] = []; // Adjust this according to the expected structure

  onMount(async () => {
    getShoppingList();
  });

  async function addItem(): Promise<void> {
    if (inputValue) {
      await push(shoppingListInDB, inputValue);
      inputValue = "";
    }
  }

  async function getShoppingList(): Promise<void> {
    onValue(shoppingListInDB, (snapshot) => {
      if (snapshot.exists()) {
        shoppingList = Object.entries(snapshot.val());
      } else {
        shoppingList = [];
      }
    });
  }

  async function deleteItem(itemID: string): Promise<void> {
    const exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
    await remove(exactLocationOfItemInDB);
  }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css"
  />
  <title>Einkaufsliste</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap"
    rel="stylesheet"
  />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="manifest" href="/site.webmanifest" />
</svelte:head>

<div class="container">
  <img src="/doggo.png" />
  <input
    type="text"
    bind:value={inputValue}
    id="input-field"
    placeholder="Brot"
  />
  <button on:click={addItem} id="add-button">Hinzufügen</button>
  <ul id="shopping-list">
    {#each shoppingList as item (item[0])}
      <li
        transition:fade={{ duration: 500 }}
        on:click={() => deleteItem(item[0])}
      >
        {item[1]}
      </li>
    {/each}
  </ul>
</div>


<!-- Styling -->
<style>
  html,
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
    background-color: #eef0f4;
    color: #432000;
    user-select: none;
  }

  .container {
    display: flex;
    flex-direction: column;
    max-width: 320px;
    margin: 30px auto;
  }

  img {
    width: 200px;
    margin: 0 auto;
    margin-left: 70px;
  }

  input {
    color: #432000;
    background-color: #dce1eb;
    border: 0;
    padding: 15px;
    border-radius: 8px;
    font-size: 20px;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    margin: 10px 0;
  }

  button {
    color: #fdfdfd;
    background-color: #8acebe;
    border: 0;
    padding: 15px;
    border-radius: 8px;
    font-size: 20px;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
  }

  button:hover {
    background-color: #80c0b2;
    cursor: pointer;
  }

  ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  ul li {
    font-size: 20px;
    background-color: #f8fdff;
    padding: 15px;
    border-radius: 8px;
    flex-grow: 1;
    text-align: center;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
    font-family: Arial, Helvetica, sans-serif;
  }

  ul li:hover {
    background-color: #8acebe37;
    cursor: pointer;
  }

  input[type="text"]:focus {
    outline: 3px solid lightblue;
  }
</style>
