# CLI Escape Game

## The Hospital Escape

A choice based text adventure game built with JS and the DOM.
Players wake up in a mysterious hospital and must make decisions that determine their survival, starting with left or right?

Every choice changes the story and can lead to different encounters, paths, and endings.

Features include

- Branching story paths
- State-based decision system
- Multiple item choices
- Monster encounters
- Restartable gameplay
- Expandable story system
- Graphic images

# Our process

<details> <summary><b>The Hospital Escape</b></summary>

The game uses a state object to track player choices and items.<br>
When a player selects an option, the state is updated.

Example:

setState: { sword: true }

This allows later story options to depend on earlier decisions.

</details>

<details> <summary><b>Story Nodes</b></summary>

The story is structured as text nodes stored inside an array.

Each node contains:

id → unique identifier

text → story content

options → choices available to the player

Each option sends the player to another node using nextText.

</details>
