import React, { Component } from 'react';
import './App.css';
import DexieService from './services/DexieService';
import Faker from 'faker';

class App extends Component {
  constructor(props) {
    super(props);
    this.dexieService = new DexieService();
  }

  componentDidMount() {
    this.listCharacters();
  }

  listCharacters = async () => {
    let characters = await this.dexieService.listCharacters();
    this.setState({ characters: characters });
  }

  add = () => {
    let randomCharacter = {
      name: Faker.name.findName(),
      email: Faker.internet.email(),
      company: Faker.company.companyName()
    };
    this.dexieService.put(randomCharacter).then(this.listCharacters);
  }

  delete = (character) => {
    this.dexieService.delete(character.id).then(this.listCharacters);
  }

  edit = (input, character) => {
    character[input.target.name] = input.target.value;
    this.dexieService.put(character).then(this.listCharacters);
  }

  render() {
    let characters = (this.state) ? this.state.characters : null;
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.add}>ADD</button>
          {
            characters &&
            characters.map((character, index) => {
              return <li key={index} >
                {
                  Object.keys(character).map((key) => (key !== "id")
                    ? <input name={key} onChange={(input) => this.edit(input, character)} type="text" defaultValue={character[key]} />
                    : null
                  )
                }
                <button onClick={() => this.delete(character)}>DELETE</button>
              </li>
            })
          }
        </header>
      </div>
    );
  }
}

export default App;
