const rootElement = document.getElementById('root');

const { Tabs, TabList, Tab, TabPanel } = ReactTabs;

class ExistingDashboard extends React.Component {
    
    onEdit = () => {
        this.props.edit(this.props.dashboard);
      }

    onCopy = () => {
        alert(this.props.dashboard + " Copy button clicked");
      }

    onRefresh = () => {
        alert(this.props.dashboard + " Refresh button clicked");
      }

    onDelete = () => {
        this.props.delete(this.props.dashboard);
      }

     onEmail = () => {
      alert(this.props.dashboard + " Email button clicked");
      }

    render() {
	    return (
            <li>
              <label>{this.props.dashboard}
                  <span class="buttons_right">
                  <button class="dashboard_btn edit" onClick={this.onEdit} title="edit">+</button>
                  <button class="dashboard_btn copy" onClick={this.onCopy} title="copy">+</button>
                  <button class="dashboard_btn refresh" onClick={this.onRefresh} title="refresh">+</button>
                  <button class="dashboard_btn delete" onClick={this.onDelete} title="delete">+</button>
                  <button class="dashboard_btn email" onClick={this.onEmail} title="Email">+</button>
                  </span>
              </label>
              <span class="buttons_right"></span>
            </li>
	    );
    }
}


// React-select for edit tab start
const customStyles = {
  option: (provided, state) => ({
  ...provided,
  borderBottom: '1px dotted gray',
  color: state.isSelected ? 'white' : 'black',
  padding: 10,
  }),
  control: styles => ({ 
    ...styles, backgroundColor: 'white'
  }),
}


class EditDashboard extends React.Component {

  render()
  {
    return (
      <div>
      <Select
        options={this.props.dashboard.map((item, index) => (
          {'value':index, 'label': item}
        ))}
        styles={customStyles}
        placeholder="Select Dashboard..."
        theme={theme => ({
                ...theme,
                borderRadius: 0,
                margin:5,
                colors: {
                  ...theme.colors,
                  primary25: 'var(--bg1)',
                  primary: 'var(--bg2)',
                },
              })}
      />
      </div>
    );
  }
}

//react select for edit tab end

// drag and drop library start
const React = window.React;
const {DragDropContext, Draggable, Droppable } = window.ReactBeautifulDnd;
const ReactDOM = window.ReactDOM;

const reorder =  (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
  };


const getItemStyle = (draggableStyle, isDragging) => ({
  
  userSelect: 'none',
  padding: 40,
  margin: `20px 20px 20px 20px`,
  background: isDragging ? '#C4A9F3' : 'white',
  
  ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? '' : '',
  padding: 10,
  margin:'-15px 8px 0 -10px',
  width: 280
});

const Col_options = [
  { value: 'col1', label: 'column 1' },
  { value: 'col2', label: 'column 2' },
  { value: 'col3', label: 'column 3' }
]


class Cardcontent extends React.Component {
  
  render(){
    return(
          <div>
            <form>
            <input type="text" placeholder="Enter Question..."></input>
            <select id="report">
              <option value="report1">Report 1</option>
              <option value="report2">Report 2</option>
              <option value="report3">Report 3</option>
            </select>
            <button type="submit">save</button>
            <button onClick={this.props.deleteCard}>x</button>
            </form>
          </div>
    );
  }
}

      
class ReportCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{id: "1", content:"1"}]
       }
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  
  onDragEnd (result) {
    if(!result.destination) {
      return; 
   }
   const items = reorder(
     this.state.items, 
     result.source.index, 
     result.destination.index
   );
   this.setState({
     items
   });
    }

  
  addCard = () => {
    for (var i=0; i<this.state.items.length; i++){
      this.setState({
        items: this.state.items.concat({id:[i+2],content:[i+2]})
       }); 
    }
  }

  
  deleteCard = () =>{
    alert("deleted")
  }
 
  render() {
     return (
       <div>
         <button className="button" onClick={this.addCard}> Add Report </button>
        <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                <div 
                    ref={provided.innerRef} 
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                >
                    {this.state.items.map((item, index) => (
                    <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                        >
                        {(provided, snapshot) => (
                        <div>
                            <div className="report_cards"
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            style={getItemStyle(
                                provided.draggableProps.style,
                                snapshot.isDragging)}
                            >
                            <Cardcontent deleteCard={this.deleteCard} />
                            </div>
                            {provided.placeholder}
                        </div>
                        )}
                    </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
                )}
            </Droppable>
            </DragDropContext>
       </div>
     ); 
  }
}

// drag and drop library end


class EditTab extends React.Component {
    render() {
	return(
        <div>  
        <EditDashboard dashboard={this.props.dashboard}/> 
        <ReportCard/>
        </div>
	);
  } 
}

//help and support popup start
class HelpPopup extends React.Component {

  submit_popup = () =>{
    alert("your query is submitted")
  }

  render() {
    return (
      <div className='popup'>
        <form className="helpForm">
          <textarea type="text" className="help_textarea" placeholder="Type your query..." />
          <div>
          <label>upload file: </label>
          <input type="file" id="fileupload"/>
          </div>
          <button onClick={this.props.closePopup} className="popup_cancel">cancel</button>
          <button onClick={this.submit_popup} type="submit" className="popup_submit">Submit</button>
        </form>
        </div>
    );
  }
}


class HelpSupport extends React.Component {
  constructor() {
    super();
    this.state = {
      showPopup: false
    };
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  render() {
    return (
      <div className='app'>
        <button onClick={this.togglePopup.bind(this)} id= "help_btn">?</button>
        {this.state.showPopup ? <HelpPopup closePopup={this.togglePopup.bind(this)}/> : null}
       </div>
    );
  }
};

//help and support popup end

class DashboardTab extends React.Component {

    render() {
    var edashboard = [];
    for (var i=0; i<this.props.dashboard.length; i++){
      edashboard.push(<ExistingDashboard edit={this.props.edit} delete={this.props.delete} dashboard={this.props.dashboard[i]}/>)
    };

	return (
        <div>
          <div>
          <button onClick={this.props.addDashboard} class="button" id = "dash_add_button" title="Add Dashboard">Add Dashboard</button>
          </div>
          <ul className="existing_dashboards">  
            {edashboard}
          </ul>
        </div>
	    );
	}
}

class DataScreen extends React.Component {
    constructor() {
    super();
        this.state = {
            tabIndex:0,
            dashboard:[],
        };
    }
   

    deleteDahboard = (dashboard_name) => {
        var cur_dashboards = this.state.dashboard;
        var new_dashboards = cur_dashboards.filter(item => item !== dashboard_name);
        this.setState({
            dashboard:new_dashboards, 
          });
     }
     

    addDashboard = () => {
      for (var i=0; i<this.state.dashboard.length; i++){ 
        this.setState({
            dashboard: this.state.dashboard.concat("Dashboard " + [i+2])
           });
          }
          }

    
    componentDidMount(){
        this.setState({
            dashboard:["Dashboard 1", "Dashboard 2", "Dashboard 3", "Dashboard 4"], 
          });
     }
    
   goToEdit() {this.setState({tabIndex:0});
   console.log(this.state);}


  render() {
	return (
          
          <div>
            <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                <TabList>
                  <Tab>Dashboard</Tab>
                  <Tab>Edit</Tab>
                  <HelpSupport/>
                </TabList>
                <TabPanel>
                    <DashboardTab
                      dashboard={this.state.dashboard}
                      addDashboard ={this.addDashboard}
                      edit = {() => this.setState({ tabIndex: 1 })}   
                      delete={this.deleteDahboard.bind(this)}
                    />
                  </TabPanel>
                  <TabPanel>
                    <EditTab dashboard={this.state.dashboard}/>
                  </TabPanel>
            </Tabs>
            </div>
        );
    }
}


ReactDOM.render(
    <DataScreen/>,rootElement
);
