import React, { Component, Fragment } from "react";
import Card from "./Card.js";

class Deck extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: [
                <Card picsum={"https://picsum.photos/800/350"} id="one" key="one" />,
                <Card picsum={"https://picsum.photos/800/352"} id="two" key="two" />,
                <Card picsum={"https://picsum.photos/800/353"} id="three" key="three" />
            ]
        }
    }

    componentDidMount() {
        this.numberOfCardsByIndex = this.images.children.length - 1;
        this.middleCardByIndex = Math.floor(this.numberOfCardsByIndex / 2);


        /* ********************* Responsive Code ******************** */

        let imgWidthAsPercentage = 50;
        imgWidthAsPercentage = window.innerWidth < 768 ? 100 : imgWidthAsPercentage;
        let navButtonsPlacementAsPercentage = 60;
        navButtonsPlacementAsPercentage = window.innerWidth < 768 ? 100 : navButtonsPlacementAsPercentage;

        this.newWidth = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ?
            (imgWidthAsPercentage / 100) * window.screen.width :
            (imgWidthAsPercentage / 100) * window.innerWidth; 

        this.viewPort.style.width = `${this.newWidth}px`;
        this.navButtonsContainer.style.width = `${navButtonsPlacementAsPercentage}vw`;
        this.buttonPrev.style.width = `${(this.newWidth / 2) * 0.30}px`;
        this.buttonNext.style.width = `${(this.newWidth / 2) * 0.30}px`;

        this.selectionButtonsContainer.style.bottom = `${this.viewPort.getBoundingClientRect().top}px`;
        for(let i = 0; i < this.images.children.length; i++) {
            this.selectionButtonsContainer.children[i].transitionDuration = "0.0s";
            this.selectionButtonsContainer.children[i].style.width = `${this.newWidth * 0.05}px`;
            this.selectionButtonsContainer.children[i].style.height = `${this.newWidth * 0.05}px`;
        }

        this.orderCards();

        window.addEventListener("resize", () => {
            imgWidthAsPercentage = 50;
            imgWidthAsPercentage = window.innerWidth < 768 ? 100 : imgWidthAsPercentage;
            navButtonsPlacementAsPercentage = 60;
            navButtonsPlacementAsPercentage = window.innerWidth < 768 ? 100 : navButtonsPlacementAsPercentage;

            this.newWidth = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ?
                (imgWidthAsPercentage / 100) * window.screen.width :
                (imgWidthAsPercentage / 100) * window.innerWidth; 

            this.viewPort.style.width = `${this.newWidth}px`;
            this.navButtonsContainer.style.width = `${navButtonsPlacementAsPercentage}vw`;
            this.buttonPrev.style.width = `${(this.newWidth / 2) * 0.30}px`;
            this.buttonNext.style.width = `${(this.newWidth / 2) * 0.30}px`;

            this.selectionButtonsContainer.style.bottom = `${this.viewPort.getBoundingClientRect().top}px`;
            for(let i = 0; i < this.images.children.length; i++) {
                this.selectionButtonsContainer.children[i].transitionDuration = "0.0s";
                this.selectionButtonsContainer.children[i].style.width = `${this.newWidth * 0.05}px`;
                this.selectionButtonsContainer.children[i].style.height = `${this.newWidth * 0.05}px`;
            }

            this.orderCards();
        });
        /* ********************************************************** */

        /* ********************* Button Navigation ****************** */


        
        /* ********************************************************** */

        /* ********************* Selection Navigation *************** */


        
        /* ********************************************************** */

        /* ********************* Autoplay Code ********************** */


        
        /* ********************************************************** */
        
    }

    orderCards = () => {
        //const cardWidth = parseFloat(getComputedStyle(this.images.children[0]).width);
        let counterForRight = 1;
        let counterForLeft = this.middleCardByIndex;

        for (let i = 0; i < this.images.children.length; i++) {
            this.images.children[i].style.transitionDuration = "0.0s";
            
            if (i < this.middleCardByIndex) {
                this.images.children[i].style.left = `${-1 * ((counterForLeft * this.newWidth) - (this.newWidth / 2))}px`;
                counterForLeft--;
            } else if (i > this.middleCardByIndex) {
                this.images.children[i].style.left = `${(counterForRight * this.newWidth) + (this.newWidth / 2)}px`;
                counterForRight++;
            } else {
                this.images.children[i].style.left = `${this.newWidth / 2}px`;
            }
        }
    }

    render() {
        return (
            <Fragment>
                <div ref={refId => this.navButtonsContainer = refId} style={styles.navButtonsContainer}>
                    <img ref={refId => this.buttonPrev = refId} style={styles.navButton} src="./left-chevron.png" alt="prev" id="prev" />
                    <img ref={refId => this.buttonNext = refId} style={styles.navButton} src="./right-chevron.png" alt="next" id="next" />
                </div>
                <div ref={refId => this.viewPort = refId} style={styles.viewPort}>
                    <div ref={refId => this.images = refId} style={styles.imagesContainer}> 
                        {this.state.cards}
                    </div>
                </div>
                <div ref={refId => this.selectionButtonsContainer = refId} style={styles.selectionButtonsContainer}>
                    {
                        this.state.cards.map((_, i) => {
                            return (<div style={styles.selectionButton} key={i}></div>)
                        })
                    }
                   
                </div>
            </Fragment>
        )
    }
}

const styles = {
    viewPort: {
        margin: 0,
        padding: 0,
        width: "500px",
        height: "300px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        //overflow: "hidden",
        //backgroundColor: "red"
    },
    imagesContainer: {
        margin: 0,
        padding: 0,
        width: "inherit",
        height: "inherit",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
    navButtonsContainer: {
        margin: 0,
        padding: 0,
        width: "100vw",        
        position: "absolute",
        top: "50%",
        left: "50%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 9999
    },
    navButton: {
        width: "50%",
        height: "auto",
        pointerEvents: "all",
        cursor: "pointer"
    },
    selectionButtonsContainer: {
        margin: 0,
        padding: 0,
        width: "fit-content",
        height: "fit-content",
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 255, 0.4)"
    },
    selectionButton: {
        marginRight: "15px",
        padding: 0,
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: "grey",
        pointerEvents: "all",
        pointer: "cursor"
    }
}

export default Deck;