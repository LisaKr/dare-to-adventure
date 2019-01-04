import React from "react";
import { connect } from "react-redux";

class subCategories extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        console.log("subcategories mounted!!!");
    }

    render() {
        return(
            <div className="subcategories-container">
                {this.props.subcategoryToShow=="FOOD" &&
                <div className="subcategories-food">
                    <div className="subcategory">
                    Italian
                    </div>

                    <div className="subcategory">
                    Asian
                    </div>

                    <div className="subcategory">
                    Coffee & Cake
                    </div>

                    <div className="subcategory">
                    show them all!
                    </div>
                </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        city: state.city,
        subcategoryToShow: state.subcategoryToShow
    };
}

export default connect(mapStateToProps)(subCategories);
