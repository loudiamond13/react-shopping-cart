import { useState } from 'react'
import { nanoid } from 'nanoid';

function App() {
  const [items, addItem] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [isCartEmpty, setIsCartEmpty] = useState(true);  //default the isCartEmpty to false
  //default input element to false when page loads, set true when "add item" button is clicked
  const [showInputBox, setShowInputBox] = useState(false); 

  //add an item to cart function
  const addNewItem = () => {
    const newItemObj = {id: nanoid(), name: newItem, quantity: 1}
    
    //add the  new item to the items array in state
    addItem([...items, newItemObj]);

    // reset the text field
    setNewItem('');
    setIsCartEmpty(false);
    setShowInputBox(false);
  };

  //remove item function
  const removeItem = (itemId) => {
    //exclude the passed in item using filter method
    const updatedItems = items.filter(item => item.id !== itemId);

    //add the updated items to the array
    addItem(updatedItems);

    //check if items is empty, 
    //if true,  set the isCartEmpty to true
    if(updatedItems.length === 0){
      setIsCartEmpty(true);
    }
  };

  const updateItemQuantity = (itemId, newQuantity) => {
    //find the item from items
    const updatedItems = items.map(item => {
      if(item.id === itemId){
        return {...item, quantity: newQuantity};
      }
      return item;
    });

    //add the updated items to the array
    addItem(updatedItems);
  };

  //update item name
  const updateItemName =(itemId, newName)=>{
    const updatedItems = items.map(item => {
      if(item.id === itemId){
        return {...item, name: newName}
      }
      return item;
    });

    //add/update the updatedItems
    addItem(updatedItems); 
  } 

  //calculate the total items
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return(
  <div className='container my-3'>
    <h1>Shopping Cart <span className="badge bg-primary rounded-pill fs-6 ms-2">{totalItems}</span></h1>

    {!showInputBox && (
        <button className="btn btn-primary m-1" onClick={() => setShowInputBox(true)}>Add Item</button>
    )}
    
    {showInputBox && (
        <div>
          <input
            type="text"
            className={`form-control ${newItem ? 'is-valid' : 'is-invalid'}`}
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Item name"
          />
          <button className="btn btn-primary my-2" onClick={addNewItem} disabled={!newItem}>Add</button>
        </div>
    )} 

    {isCartEmpty && (
        <div className='mt-2'>Your cart is empty! Add some items to it.</div>
    )}

    {items.map(item => (
      <div key={item.id} className='d-flex mt-3 align-items-center'>
        <input
          type="text"
          className={`CartItem-name form-control ${item.name ? 'is-valid' : 'is-invalid'}`}
          value={item.name}
          onChange={(event) => updateItemName(item.id, event.target.value)}
        />
        <p className='m-2 fw-bold'>Qty:{item.quantity}</p>

        <button className="CartItem-add btn btn-primary m-1"
          onClick={() => updateItemQuantity(item.id, Math.min(item.quantity + 1, 10))} 
          disabled={item.quantity >= 10}>
            +
        </button>
        <button className="CartItem-remove btn btn-danger m-1" 
          onClick={() => item.quantity > 1 ? updateItemQuantity(item.id, item.quantity - 1) : removeItem(item.id)} 
          disabled={item.quantity <= 1}>
            -
        </button>
        <button className="CartItem-remove btn btn-danger m-1" onClick={() => removeItem(item.id)}>Remove</button>
      </div>
    ))}
    
  </div>
  );
  
}

export default App


// return (
//   <>
//     <div>
//       <a href="https://vitejs.dev" target="_blank">
//         <img src={viteLogo} className="logo" alt="Vite logo" />
//       </a>
//       <a href="https://react.dev" target="_blank">
//         <img src={reactLogo} className="logo react" alt="React logo" />
//       </a>
//     </div>
//     <h1>Vite + React</h1>
//     <div className="card">
//       <button onClick={() => setCount((count) => count + 1)}>
//         count is {count}
//       </button>
//       <p>
//         Edit <code>src/App.jsx</code> and save to test HMR
//       </p>
//     </div>
//     <p className="read-the-docs">
//       Click on the Vite and React logos to learn more
//     </p>
//   </>
// )