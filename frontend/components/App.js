// ❗ IMPORTANT
// The ✨ tasks found inside this component are not in order.
// Check the README for the appropriate sequence to follow.
import React, { useState, useEffect } from 'react'

let id = 0
const getId = () => ++id

let teamMembers = [
  {
    id: getId(), fname: "Alice", lname: "Smith",
    bio: "Passionate about front-end development and user experience. \
I love creating intuitive and visually appealing web interfaces."
  },
  {
    id: getId(), fname: "Bob", lname: "Johnson",
    bio: "Aspiring web developer with a background in graphic design. \
I enjoy bringing creativity and aesthetics to the digital world."
  },
]

export default function App() {

  const [members, setMembers] = useState(teamMembers)
  const [editing, setEditing] = useState(null)
  // ✨ Create a third state to track the values of the inputs

  const [form, setForm] = useState({
    fname: '',
    lname: '',
    bio: '',
  });

  useEffect(() => {
    // ✨ If the `editing` state changes from null to the number 2 (for example)
    if (editing != null) { // Check if editing is not null
      const memberToEdit = members.find(m => m.id === editing);
      if (memberToEdit) {
        setForm(memberToEdit);
      }
    } else {
      setForm({ fname: '', lname: '', bio: '' }); // Reset form if not editing
    }
  }, [editing, members]);

  
  const onChange = evt => {
    // ✨ This is the change handler for your text inputs and your textarea.
    // You can check `evt.target.id` to know which input changed

    // and then you can use `evt.target.value` to update the state of the form

    const { id, value } = evt.target;
    setForm(prevForm => ({ ...prevForm, [id]: value }));
  };


  const edit = id => {
    // ✨ Put this function inside a click handler for the <button>Edit</button>.
    
    // It should change the value of `editing` state to be the id of the member
    // const memberToEdit = members.find(m => m.id === id);
    // setEditing(id);
    // setForm({
    //   fname: memberToEdit.fname,
    //   lname: memberToEdit.lname,
    //   bio: memberToEdit.bio,
    // });
           setEditing(id);
    // whose Edit button was clicked
  }
  const submitNewMember = () => {
    // This takes the values of the form and constructs a new member object,
    // which is then concatenated at the end of the `members` state
    const newMember = { id: getId(), ...form };
    setMembers(prevMembers => [...prevMembers, newMember]);
  };
  
  
  const editExistingMember = () => {
    // ✨ This takes the values of the form and replaces the data of the
    // member in the `members` state whose id matches the `editing` state
    setMembers(prevMembers =>
      prevMembers.map(m => (m.id === editing ? { ...m, ...form } : m))
    );
    setEditing(null); // Exit editing mode
  };
    // axios.post("http://localhost:3003/?", edit).then(res => {
    //         const editExisting = res.data;
    //         setEditing([editExisting, ...members]);
    //         setMembers(edit.id);
    // })
  

  const onSubmit = evt => {
    // ✨ This is the submit handler for your form element. 
      evt.preventDefault();
    if (editing != null) {
      editExistingMember();
    } else {
      submitNewMember();
    }
    setForm({ fname: '', lname: '', bio: '' }); // Reset form
  };
    
        // if(!newSubmit.fname || !newSubmit.lname || !newSubmit.bio)  return
    // It will call either `submitNewMember` or `editExistingMember`

    // depending on whether the `editing` state is null or has an id in it.
    // Don't allow the page to reload! Prevent the default behavior
    // and clean up the form after submitting

    const resetForm = () => {
      setForm({
        fname: '',
        lname: '',
        bio: '',
      });
      setMembers([...members]);
      setEditing(null);
    };

  
  return (
    <div>{/* ✨ Fix the JSX by wiring the necessary values and event handlers */}
      <div id="membersList">
        <h2>Team Members</h2>
        <div>
          {
            members.map(mem => (
              <div key={mem.id} className="member">
                <div>
                  <h4>{mem.fname} {mem.lname}</h4>
                  <p>{mem.bio}</p>
                </div>
                <button onClick={() => edit(mem.id)}>Edit</button>
              </div>
            ))}
        </div>
      </div>


      <div id="membersForm">
        <h2>{editing ? 'Edit' : 'Add'} a Team Member</h2>
        <form onSubmit={onSubmit}> 
          <div>
            <label htmlFor="fname">First Name </label>
            <input id="fname" type="text" placeholder="Type First Name" 
            value={form.fname} onChange={onChange} 
            
            
            />
          </div>

          <div>
            <label htmlFor="lname">Last Name </label>
            <input id="lname" 
            type="text" 
            placeholder="Type Last Name" 
            value={form.lname} 
            onChange={onChange}/>
          </div>

          <div>
            <label htmlFor="bio">Bio </label>
            <textarea id="bio" placeholder="Type Bio"
            value={form.bio} onChange={onChange}  />
          </div>

          {/* Remove onChange from the submit input and let the form handle it */}
          <div>
            <button type="submit">{editing ? 'Update Member' : 'Add Member'}</button>
            <button type="reset" onClick={resetForm}>Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
            }