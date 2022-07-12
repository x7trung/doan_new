import { Upload } from "antd";
import _ from "lodash";

const ImgUpload = ({ fileList, setFileList, length }) => {
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onPreview = async (file) => {
        let src = file.url;

        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);

                reader.onload = () => resolve(reader.result);
            });
        }

        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    return (
        <div className='add-input'>

            <Upload
                beforeUpload={() => false}
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
            >
                {fileList.length < length && "+ Upload"}
            </Upload>

        </div>
    );
};

export default ImgUpload;