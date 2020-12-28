/*import { makeStyles } from "@material-ui/core/styles";*/
import Link from "next/link";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Home from "@material-ui/icons/Home";
import CodeIcon from "@material-ui/icons/Code";
/*
const useStyles = makeStyles((theme) => ({
  a: {
    color: theme.palette.primary.main,
  },
}));*/

export default function list() {
  /*const classes = useStyles();*/
  return (
    <div>
      <List>
        <ListItem button>
          <ListItemIcon>
            <Home  />
          </ListItemIcon>
          <ListItemText>
            <Link href="/">
              <a /*className={classes.a}*/>Home</a>
            </Link>
          </ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <CodeIcon  />
          </ListItemIcon>
          <ListItemText>
            <Link href="/services">
              <a /*className={classes.a}*/>Services</a>
            </Link>
          </ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        {["All", "mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? (
                <InboxIcon />
              ) : (
                <MailIcon />
              )}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}