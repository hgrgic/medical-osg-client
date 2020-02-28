import React from 'react';

import { 
    Button
} from 'react-bootstrap';

const UploadImage = () => {
    return (
        <div className="row mt-5">
            <div className="col-lg-12 mb-12 grid-margin discussion-board">
                <div className="card h-100">
                    <h4 className="card-header">Post your image</h4>
                    <div className="card-body">
                    <p className="card-text">Post your images here to be annotated by our machine-learning backend.</p>
                    </div>
                    <div className="card-footer">
                    <Button variant="btn btn-primary">Upload</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadImage;