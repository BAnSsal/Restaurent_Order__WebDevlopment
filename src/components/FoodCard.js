import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function FoodCard(props) {
  console.log(props.item)
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleAddToCart = (id) => {
    props.addToCart(id);
  };
  return (
<div style={{  }}>    <Grid item xs={12} md={6} >
    <Card sx={{ maxWidth: 331 , margin: 4 ,marginRight: 0 ,  width: '110%' }}> 
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="Ingredients">
            D
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.name}
        subheader={props.category}
      />
      <CardMedia component="img" height="194" image={props.photo} alt={props.name} /> 
      <CardContent>
        <Typography variant="body2" color="text.secondary" style={{ fontWeight: 'bold',fontsize:'20px' }}>
          {props.ingredients}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
     
        <IconButton aria-label="add to favorites" onClick={() => handleAddToCart(props.item)}>
          <AddShoppingCartIcon  />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          
        <p >{props.method}</p>

        </CardContent>
      </Collapse>
    </Card>
    </Grid>
    </div>
  );
}
