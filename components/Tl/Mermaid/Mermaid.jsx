"use client"
import {
    HTMLContainer,
    Rectangle2d,
    ShapeUtil,
    resizeBox,
} from 'tldraw';
import MermaidRender from "./MermaidRender"

export class Mermaid extends ShapeUtil {
    static type = 'card';

    isAspectRatioLocked(_shape) {
        return false;
    }

    canResize(_shape) {
        return true;
    }

    canBind(_shape) {
        return true;
    }

    getDefaultProps() {
        return {
            w: 300,
            h: 300,
            text: ""
        };
    }

    getGeometry(shape) {
        return new Rectangle2d({
            width: shape.props.w,
            height: shape.props.h,
            isFilled: true,
        });
    }

    indicator(shape) {
        return <rect width={shape.props.w} height={shape.props.h} />;
    }

    onResize = (shape, info) => {
        return resizeBox(shape, info);
    };


    component(shape) {

        return (
            <HTMLContainer id={shape.id} >
                <MermaidRender key={shape.id} chart={this.editor.getShape(shape.id).props.text}/>
            </HTMLContainer>
        );
    }

}
