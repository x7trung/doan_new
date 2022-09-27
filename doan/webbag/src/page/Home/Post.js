import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { BsFillHeartFill } from 'react-icons/bs';
import '../../assets/css/post.css'
import { Link } from "react-router-dom"

const PostItem = ({ data }) => {

    const checkLongContent = (content) => {
        if (content.length > 200) {
            return content.slice(0, 170) + "..."
        } else
            return content
    }
    return (
        <div>

            <div >

                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image={data.image}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {data.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ minHeight: "100px" }}>
                            {checkLongContent(data.content)}<Link to="" style={{ marginLeft: 7 }}>Xem thêm</Link>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <BsFillHeartFill />
                        <Button size="small">Share</Button>
                    </CardActions>
                </Card>
            </div>
        </div>
    )

}
export default PostItem

