const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('options-buttons')

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
    {
        id:1
        text: "    You wake up, drowsy and light headed, in an unfamiliar hospital room.\n\
        Who are you? Where are you? How did you get here? All questions with no answer.\n\
        You stumble across to the room and reach the door. A cold shiver running down your spine.\n\
        The door creaks open on its own but silence awaits on the other side.\n\
        You exit the door and contemplate on your choices. Which door to take next?\n\
        Pick wisely for it may lead to your demise"
        options : [
            {
                text: "    Left or right? \n<==- . ===>"
                setState: { blueGoo:true}
                nextText: 2
            }
        ]
    }
  


startGame()