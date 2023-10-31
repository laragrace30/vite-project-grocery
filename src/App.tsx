import React, { useEffect, useState } from 'react';
import List from './List';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Item {
  id: string;
  title: string;
  checked: boolean;
}

function App() {
  const getLocalStorage = (): Item[] => {
    const list = localStorage.getItem('item');
    if (list) {
      return JSON.parse(list);
    }
    return [];
  }

  const [name, setName] = useState<string>('');
  const [list, setList] = useState<Item[]>(getLocalStorage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      showAlert('danger', 'Please Provide Value');
    } else {
      const newItem: Item = {
        id: new Date().getTime().toString(),
        title: name.charAt(0).toUpperCase() + name.slice(1), 
        checked: false,
      };
      setList([...list, newItem]);
      setName('');
      showAlert('success', 'Item Added To The List');
    }
  }

  const deleteItem = (id: string) => {
    const newList = list.filter(item => item.id !== id);
    setList(newList);
    showAlert('success', 'Item Deleted');
  }

  const toggleChecked = (id: string) => {
    setList(list.map(item => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    }));
  }

  useEffect(() => {
    localStorage.setItem('item', JSON.stringify(list));
  }, [list]);

  const showAlert = (type = '', msg = '') => {
    if (type === 'success') {
      toast.success(msg, { autoClose: 3000, hideProgressBar: false, position: 'top-center' });
    } else if (type === 'danger') {
      toast.error(msg, { autoClose: 3000, hideProgressBar: false, position: 'top-center' });
    }
  };

  return (
    <div id="root">
      <section className="section-center">
        <form onSubmit={handleSubmit}>
          <h4>Grocery Bud</h4>
          <div className="form-control">
            <input type="text" className="form-input" id="checkbox" value={name} onChange={e => setName(e.target.value)} />
            <input type="submit" className="btn" value="Add Item" />
          </div>
        </form>
        {list.length > 0 && (
          <div>
            <List items={list} removeItem={deleteItem} toggleChecked={toggleChecked} />
          </div>
        )}
        <ToastContainer autoClose={3000} hideProgressBar={false} position="top-center" className="Toastify" />
      </section>
    </div>
  );
}

export default App;
