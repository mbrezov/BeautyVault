const ProductCard = (props: any) => {
    return (
        <div>
            <div>{props.title}</div>
            {props.buy === true ? <div>Kupi</div> : <div>Nemoj kupiti</div>}
            <div>{props.rating}</div>
        </div>
    );
};

export default ProductCard;
