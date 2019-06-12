import { Container } from 'unstated';

const defaultState = {
  list: [
    {
      id: 1,
      completed: false,
      text: 'Read README'
    },
    {
      id: 2,
      completed: false,
      text: 'Add one todo'
    },
    {
      id: 3,
      completed: false,
      text: 'Add filters'
    },
    {
      id: 4,
      completed: false,
      text: 'Add multiple lists'
    },
    {
      id: 5,
      completed: false,
      text: 'Optional: add tests'
    }
  ],
  // boolean to tell if the app in the filtering mode
  filterOn: false,
  //new array to hold the displayedList
  displayList: []
};

class TodosContainer extends Container {
  constructor(props) {
    super(props);

    this.state = this.readStorage();
  }

  componentDidMount() {
    this.setState({ displayList: this.state.list });
  }

  readStorage() {
    if (window && window.localStorage) {
      const state = window.localStorage.getItem('appState');
      if (state) {
        return JSON.parse(state);
      }
    }
    console.log(defaultState);
    return defaultState;
  }

  syncStorage() {
    if (window && window.localStorage) {
      console.log(this.state);
      const state = JSON.stringify(this.state);
      this.setState({ displayList: this.state.list });
      window.localStorage.setItem('appState', state);
    }
  }

  getList() {
    // if the filtering process is on display the result list from the filter else display the original list
    const { filterOn, displayList, list } = this.state;
    return filterOn ? displayList : list;
  }

  filterList = filterState => {
    const { displayList, list } = this.state;
    // check the filter option and store the filterd data accordingly in the state variable displayList
    const tempList =
      filterState === 'completed'
        ? list.filter(item => item.completed)
        : filterState === 'active'
        ? list.filter(item => !item.completed)
        : list;
    this.setState({ displayList: tempList, filterOn: true });
    return displayList;
  };

  toggleComplete = async id => {
    const item = this.state.list.find(i => i.id === id);
    const completed = !item.completed;

    // We're using await on setState here because this comes from unstated package, not React
    // See: https://github.com/jamiebuilds/unstated#introducing-unstated
    await this.setState(state => {
      const list = state.list.map(item => {
        if (item.id !== id) return item;
        return {
          ...item,
          completed
        };
      });
      return { list };
    });

    this.syncStorage();
  };

  createTodo = async text => {
    await this.setState(state => {
      const item = {
        completed: false,
        text,
        id: state.list.length + 1
      };

      const list = state.list.concat(item);
      return { list };
    });

    this.syncStorage();
  };
}

export default TodosContainer;
