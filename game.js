const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}


function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}



const textNodes = [
  { // THE INITIAL 2 BUTTONS
    id: 1,
    text: "You wake up, drowsy and light headed, in an unfamiliar hospital room.\n\
    Who are you? Where are you? How did you get here? All questions with no answer.\n\
    You stumble across to the room and reach the door. A cold shiver running down your spine.\n\
    The door creaks open on its own but silence awaits on the other side.\n\
    You exit the door and contemplate on your choices. Which door to take next?\n\
    Pick wisely for it may lead to your demise\n\
    Left or right? \n<=== . ===>", // opening description
    options: [
      {
        text: '<==== Left', // CHAM
        setState: { goLeft: true },
        nextText: 2
      },
      {
        text: 'Right ===>', // NAOMAN - I think we need to add a setState here just like the above
        setState: { goRight: true }, //adding this line for goRight
        nextText: 99 // changed to new - 99
      }
    ]
  }, //SECTION END




// CHAM SECTION (LEFT CHILD)
  {
    id: 2,
    text: 'You venture forth in search of answers to where you are when you come across a merchant.',
    options: [
      {
        text: 'Trade the goo for a sword', //BUTTON 1
        requiredState: (currentState) => currentState.goLeft,
        setState: { goLeft: false, sword: true },
        nextText: 3
      },
      {
        text: 'Trade the goo for a shield', //BUTTON 2
        requiredState: (currentState) => currentState.goLeft,
        setState: { goLeft: false, shield: true },
        nextText: 3
      },
      {
        text: 'Ignore the merchant', // BUTTON 3
        nextText: 3
      }
    ]
  },


// TESTING NEW SECTION (RIGHT CHILD) - NAOMAN
  {
    id: 99,
    text: 'You venture forth in search of answers to where you are when you encounter two items',
    options: [
      {
        text: 'Take the med-kit', //BUTTON 1
        requiredState: (currentState) => currentState.goRight,
        setState: { goRight: false, sword: true },
        nextText: 97
      },
      {
        text: 'Take the scalpel', //BUTTON 2
        requiredState: (currentState) => currentState.goRight,
        setState: { goRight: false, shield: true },
        nextText: 98
      }
    ]
  },






  {
    id: 98,
    text: 'An ominious shadow appears behind you.\n\
    You turn around, startled',
    options: [
      {
        text: 'Attack the monster with a scalpel',
        nextText: 96
      },
      {
        text: 'Run away',
        nextText: 97
      }
    ]
  },





  {
    id: 97,
    text: 'You run as fast as you can but the chimera is too quick\n\
    It delivers a quick blow, making your vision blurry.\n\
    You reach out to the med-kit you had picked up but your vision fades.\n\
    You did  not escape. The end.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },





  {
    id: 96,
    text: 'You take a swing at the chimera with your scalpel in hand, it winces in pain and retreats',
    options: [
      {
        text: 'Chase after it',
        nextText: 95
      },
      {
        text: 'Move into the next room',
        nextText: 92
      }
    ]
  },





  {
    id: 95,
    text: 'You follow its footsteps as it scurries away into the dark hallway and eventually confront it again.',
    options: [
      {
        text: 'Attack it with your scalpel',
        nextText: 93
      },
      {
        text: 'Punch it',
        // requiredState: (currentState) => currentState.sword,
        nextText: 94
      },
      {
        text: 'Hide a nearby bed',
        setState: { goBed: true },
        nextText: 92
      },
      {
        text: 'Try to speak and reason with it',
        setState: { goSpeak: true },
        nextText: 92
      }
    ]
  },





  {
    id: 92,
    text: 'It senses your weakness and attacks ferociosly, ultimately meeting your demise\n\
    You did  not escape. The end.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },

  {
    id: 94,
    text: 'You foolishly thought this monster could be slain with a single punch.\n\
    You arent superman mate.\n\
    You did  not escape. The end.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },

  {
    id: 93,
    text: 'You thrust the scalpel into the core of the monster, causing it to explode. After the dust settles, you see the monster is reduced to ashes.\n\
    Upon your victory, your run out of the hospital, \n\
    with many questions left to answer. Who? What? Where? Why? How? \n\
    Alas, it doesnt matter as you have esaped that nightmare.',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame()