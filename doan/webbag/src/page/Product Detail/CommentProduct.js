import React, { useContext, useState } from "react";
import ProductServices from '../../services/productServices'
import '../../assets/css/productdetail.css'
import {
    Comment,
    Avatar,
    Form,
    Button,
    List,
    Input,
    Rate,
    Tooltip,
} from "antd";
import moment from "moment";
import Toast from "../../components/Toast";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
const { TextArea } = Input;

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
        itemLayout="horizontal"
        renderItem={(props) => (
            <Comment
                {...props}
                datetime={
                    <div>
                        <Tooltip
                            title={moment(props.datetime).format("YYYY-MM-DD HH:mm:ss")}
                        >
                            <span>{moment(props.datetime).fromNow()}</span>
                        </Tooltip>
                        <Rate
                            allowHalf
                            defaultValue={props.rate}
                            disabled
                            style={{ marginLeft: 10, fontSize: 12 }}
                        />
                    </div>
                }
            />
        )}
    />
);

const Editor = ({
    onChangeComment,
    onChangeRate,
    onSubmit,
    submitting,
    comment,
    rate,
    fastComment,
    setComment
}) => (
    <>
        <Form.Item>
            <Rate allowHalf defaultValue={rate} onChange={onChangeRate} />
        </Form.Item>
        <div className="comment-user_wrapper">
            {
                fastComment.map((item, index) => {
                    return <div className="comment-user" key={index} onClick={() => setComment((pre) => pre + item + ",")}>{item}</div>
                })

            }

        </div>
        <Form.Item>
            <TextArea
                rows={4}
                onChange={onChangeComment}
                value={comment}
                placeholder="Viết bình luận..."
                style={{ width: '100%' }}
            />
        </Form.Item>
        <Form.Item>
            <Button
                htmlType="submit"
                loading={submitting}
                onClick={onSubmit}
                type="primary"
            >
                Bình luận
            </Button>
        </Form.Item>
    </>
);

const CommentInput = ({ product }) => {
    const { auth } = useContext(AuthContext)
    const { id } = useParams()
    const [comments, setComments] = useState(product.comments);
    const [submitting, setSubmitting] = useState(false);
    const [comment, setComment] = useState("");
    const [rate, setRate] = useState(0);
    const [fastComment, setFastComment] = useState([
        "sản phẩm chất lượng tốt",
        "sản phẩm tuyệt vờI",
        "sản phẩm không đúng hàng",
        "sản phẩm lỗi"
    ])

    const handleSubmit = async () => {
        if (!comment) return;
        try {
            setSubmitting(true);
            const newComment = {
                author: auth.name,
                rate: rate,
                avatar: auth?.image || "https://joeschmoe.io/api/v1/random",
                content: comment,
                datetime: Date.now(),
            }
            setSubmitting(false);
            setComment("");
            setRate(0);
            await ProductServices.comment(id, newComment)
            setComments([
                ...comments,
                {
                    author: auth.name,
                    rate: rate,
                    avatar: auth?.image || "https://joeschmoe.io/api/v1/random",
                    content: <p>{comment}</p>,
                    datetime: Date.now(),
                },
            ]);

            Toast("success", "comment thành công")
        } catch (error) {
            Toast("error", error.message)
        }

    };

    const handleChangeComment = (e) => {
        setComment(e.target.value);
    };
    const handleChangeRate = (value) => {
        setRate(value);
    };

    return (
        <> <Comment
            avatar={
                <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
            }
            content={
                <Editor
                    onChangeComment={handleChangeComment}
                    onChangeRate={handleChangeRate}
                    onSubmit={handleSubmit}
                    submitting={submitting}
                    comment={comment}
                    setComment={setComment}
                    rate={rate}
                    fastComment={fastComment}
                />
            }
        />
            {comments.length > 0 && <CommentList comments={comments} />}

        </>
    );
};

export default CommentInput;                 