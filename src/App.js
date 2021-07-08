import './App.css';
import { useState, useEffect } from 'react';
import { Typography, TextField, Grid, Paper, Button, Tabs, Tab, AppBar, Box, Fab, OutlinedInput, InputLabel, MenuItem, FormControl, Chip, Select } from '@material-ui/core';
import { useTheme } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';
import ReplayOutlinedIcon from '@material-ui/icons/ReplayOutlined';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from './loader.png';

import HTML from './img/html.svg';
import CSS from './img/css.svg';
import JS from './img/js.svg';
import REACT from './img/react.svg';
import EXPRESS from './img/express.png';
import CCPP from './img/CC++.png';
import NODE from './img/nodejs.svg';
import MONGODB from './img/mongodb.png';
import PYTHON from './img/python.svg';
import MATERIALUI from './img/materialui.svg';

toast.configure()

const names = [
  "HTML5",
  "CSS3",
  "Java Script",
  "React JS",
  "Node JS",
  "Express JS",
  "MongoDB",
  "C/C++",
  "Python",
  "Material UI"
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}
const url = 'https://portofolio-helper-server.herokuapp.com/save';
// const url = 'http://localhost:5000/save';
function App() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [link, setLink] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [technologies, setTechnologies] = useState([]);
  const [imgUrl, setImgUrl] = useState('https://via.placeholder.com/720x480');
  const [isUploading, setIsUploading] = useState(false);
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([])
  const theme = useTheme();

  useEffect(() => {
    fetch('https://portofolio-helper-server.herokuapp.com/getproject', {
      method: 'get',
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setProjects(response);
      })
      .catch((err) => {
        console.log(err)
        let message = 'No Response from the Server'
        if (err.response) {
          message = err.response.message
        }
        toast.error(message, { autoClose: 5000, draggable: true });
      })
  }, [])

  const getProjects = () => {
    fetch('https://portofolio-helper-server.herokuapp.com/getproject', {
      method: 'get'
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setProjects(response);
      })
      .catch((err) => {
        console.log(err)
        let message = 'No Response from the Server'
        if (err.response) {
          message = err.response.message
        }
        toast.error(message, { autoClose: 5000, draggable: true });
      })
  }

  const handleSubmit = () => {
    fetch(url, {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      mode: 'cors',
      body: JSON.stringify({
        projectName: name,
        projectDescription: desc,
        projectImage: imgUrl,
        projectLink: link,
        githubLink,
        technologies,
      })
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        toast.success(response.message, { autoClose: 5000 })
      })
      .catch((err) => {
        console.log(err);
        toast.error('There was some error!!!', { autoClose: 5000 })
      })
  }

  const handleValue = (e, val) => {
    setValue(val);
  }

  const techImgs = (tech) => {
    switch (tech) {
      case "HTML5":
        return HTML;
      case "CSS3":
        return CSS;
      case "Java Script":
        return JS;
      case "React JS":
        return REACT;
      case "Node JS":
        return NODE;
      case "MongoDB":
        return MONGODB;
      case "Express JS":
        return EXPRESS;
      case "C/C++":
        return CCPP;
      case "Python":
        return PYTHON;
      case "Material UI":
        return MATERIALUI;
      default:
        break;
    }
  }

  const handleChange = (event) => {
    setTechnologies(event.target.value);
  };
  return (
    <>
      <AppBar position="sticky">
        <Tabs value={value} onChange={handleValue}>
          <Tab label="Add Project" />
          <Tab label="View All Project" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div className="App">
          {isUploading &&
            <div className="loading">
              <img src={Loader} width="100px" alt="loader" />
            </div>
          }
          {/* <Typography variant='h2' component='h2' gutterBottom >Add Projects</Typography> */}
          <Grid container spacing={3}>
            <Grid className="left" item lg={6} md={6} sm={6} xs={12}>
              <Paper style={{ padding: '2em' }}>
                <Grid style={{ marginBottom: '0.5em' }} item>
                  <TextField
                    fullWidth
                    variant='outlined'
                    label="Project Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid style={{ marginBottom: '0.5em' }} item>
                  <TextField
                    label="Project Description"
                    multiline
                    rows={10}
                    variant="outlined"
                    fullWidth
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </Grid>
                <Grid style={{ marginBottom: '0.5em' }} item>
                  <TextField
                    fullWidth
                    variant='outlined'
                    label="Live Project Link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </Grid>
                <Grid style={{ marginBottom: '0.5em' }} item>
                  <TextField
                    fullWidth
                    variant='outlined'
                    label="Github Link"
                    value={githubLink}
                    onChange={(e) => setGithubLink(e.target.value)}
                  />
                </Grid>
                <Grid style={{ marginBottom: '0.5em' }} item>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="technologies">Technologies Used</InputLabel>
                    <Select
                      labelId="technologies"
                      multiple
                      value={technologies}
                      onChange={handleChange}
                      input={<OutlinedInput label="Technologies Used" id="select-multiple-chip" />}
                      renderValue={(selected) => (
                        <div>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </div>
                      )}
                    // MenuProps={MenuProps}
                    >
                      {names.map((name) => (
                        <MenuItem key={name} value={name} style={getStyles(name, technologies, theme)}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    component="label"
                    color="primary"
                  >
                    Upload Project Image
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        setIsUploading(true);
                        if (e.target.files[0].size > 0.5 * 1024 * 1024 * 1024) {
                          toast.error("Please Select File Under 500KB", {
                            autoClose: 5000
                          })
                          return
                        } else {
                          const data = new FormData()
                          data.append("file", e.target.files[0])
                          data.append("upload_preset", "sgp-post")
                          data.append("cloud_name", "dkoj7svtw")
                          fetch("https://api.cloudinary.com/v1_1/dkoj7svtw/image/upload", {
                            method: "post",
                            body: data
                          })
                            .then(res => res.json())
                            .then(data1 => {
                              // console.log(data1.url)
                              setIsUploading(false);
                              setImgUrl(data1.url)
                              toast.success('Uploaded Image 😊', {
                                autoClose: 5000,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                              })
                            })
                            .catch((err) => {
                              toast.error("Some Error Occured", {
                                autoClose: 5000,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                              })
                            })
                        }
                      }
                      }
                    />
                  </Button>
                </Grid>
              </Paper>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Grid item>
                <Paper style={{ padding: '2em' }}>
                  <img src={imgUrl} width="100%" alt="project_image" />
                </Paper>
              </Grid>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}
              style={{ marginTop: '1em' }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {
          projects.map((proj, index) => {
            if (index % 2 === 0) {
              return (
                <Paper key={proj._id} style={{ margin: '1em', padding: '2em' }} >
                  <Grid container spacing={3}>
                    <Grid style={{ textAlign: 'justify' }} item lg={6} md={6} sm={12} xs={12}>
                      <Typography style={{ fontWeight: '600' }} variant="h4" gutterBottom>{proj.projectName}</Typography>
                      <Typography variant="subtitle1" gutterBottom>{proj.projectDescription}</Typography>
                      <Typography variant="h6" gutterBottom>Technologies Used:</Typography>
                      <div className="techgrid">
                        {
                          proj.technologies.map((tech, index) => {
                            return (
                              <Box style={{ margin: '0 0.5em' }} gutterBottom key={index}>
                                <img width="50px" src={techImgs(tech)} alt={tech} />
                              </Box>
                            )
                          })
                        }
                      </div>
                      <Button
                        variant="contained"
                        color="primary"
                        endIcon={<LinkOutlinedIcon />}
                        href={proj.projectLink}
                        target="blank"
                      >
                        Live Project
                      </Button>
                      <Button
                        style={{ marginLeft: '2em' }}
                        variant="contained"
                        color="secondary"
                        endIcon={<LinkOutlinedIcon />}
                        href={proj.githubLink}
                        target="blank"
                      >
                        Github Link
                      </Button>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Box>
                        <img width="100%" src={proj.projectImage} alt="img" />
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              )
            } else {
              return (
                <Paper key={proj._id} style={{ margin: '1em', padding: '2em' }} >
                  <Grid container spacing={3}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Box>
                        <img width="100%" src={proj.projectImage} alt="img" />
                      </Box>
                    </Grid>
                    <Grid style={{ testAlign: 'justify' }} item lg={6} md={6} sm={12} xs={12}>
                      <Typography style={{ fontWeight: '600' }} variant="h4" gutterBottom>{proj.projectName}</Typography>
                      <Typography variant="subtitle1" gutterBottom>{proj.projectDescription}</Typography>
                      <Typography variant="h6" gutterBottom>Technologies Used:</Typography>
                      <div className="techgrid">
                        {
                          proj.technologies.map((tech, index) => {
                            return (
                              <Box style={{ margin: '0 0.5em' }} gutterBottom key={index}>
                                <img width="50px" src={techImgs(tech)} alt={tech} />
                              </Box>
                            )
                          })
                        }
                      </div>
                      <Button
                        variant="contained"
                        color="primary"
                        endIcon={<LinkOutlinedIcon />}
                        href={proj.projectLink}
                        target="blank"
                      >
                        Live Project
                      </Button>
                      <Button
                        style={{ marginLeft: '2em' }}
                        variant="contained"
                        color="secondary"
                        endIcon={<LinkOutlinedIcon />}
                        href={proj.githubLink}
                        target="blank"
                      >
                        Github Link
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              )
            }
          })
        }
        <Fab onClick={getProjects} style={{ position: 'fixed', bottom: '1em', right: '1em' }} color='primary'>
          <ReplayOutlinedIcon />
        </Fab>
      </TabPanel>
    </>
  );
}

const TabPanel = (props) => {

  const { value, index, children } = props;
  return (
    <>
      {
        value === index && children
      }
    </>
  )
}

export default App;
