import React, { useState, useEffect, useContext } from "react";
import {
	ListGroup,
	ListGroupItem,
	Pagination,
	PaginationItem,
	PaginationNext,
	PaginationPrev,
	Button,
} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { vehicles } from "../../../apiStarWars.js";
import { Link } from "react-router-dom";
import { Context } from "../../../store/appContext";

const ListVehicles = () => {
	var [data, setData] = useState([]);
	var [page, setPage] = useState(1);
	var [pages, setPages] = useState(1);
	const myStore = useContext(Context);

	function irAPagina(id) {
		vehicles.getQuery(id).then((data) => {
			// Se actualizan los valores del estado
			setData(data.results);
			setPage(id);
			// Esta actualizacion tiene un hook
			setPages(data.total_pages);
		});
	}

	function siguientePagina() {
		if (page < pages) {
			irAPagina(page + 1);
		}
	}

	function previaPagina() {
		if (1 < page) {
			irAPagina(page - 1);
		}
	}

	useEffect(() => {
		irAPagina(1);
		return () => {
		};
	}, []);

	useEffect(() => {
		// actualizarPaginacion();
		return () => {
		};
	}, [pages, pages]);

	function agregarFavoritos(vehicle) {
		const favorito = {
			id: `vehicle/${vehicle.uid}`,
			name: vehicle.name,
		};
		myStore.actions.agregarFavorito(favorito);
	}

	function getItems() {
		if (!data) return;
		return data.map((vehicle) => {
			return (
				<ListGroup.Item key={vehicle.uid}>
					<Card style={{ width: "18rem" }}>
						<Card.Img
							className="img-fluid"
							variant="top"
							height="50"
							src={vehicle.img}
						/>
						<Card.Body>
							<Card.Title>{vehicle.name}</Card.Title>
							<Link
								className="btn btn-outline-info mx-2"
								to={`/vehicles/${vehicle.uid}`}>
								Read more
							</Link>
							<Button
								variant="btn btn-outline-danger"
								onClick={() => agregarFavoritos(vehicle)}>
								Star
							</Button>
						</Card.Body>
					</Card>
				</ListGroup.Item>
			);
		});
	}

	function paginationItems() {
		var items = [];
		for (let i = 1; i <= pages; i++) {
			items.push(
				<Pagination.Item
					onClick={() => irAPagina(i)}
					key={i}
					active={i === page}>
					{i}
				</Pagination.Item>
			);
		}
		return items;
	}

	return (
		<div>
			<ListGroup horizontal style={{ overflowX: "scroll" }}>
				{getItems()}
			</ListGroup>
			<Pagination>
				<Pagination.Prev onClick={previaPagina} />
				{paginationItems()}
				<Pagination.Next onClick={siguientePagina} />
			</Pagination>
		</div>
	);
};
export default ListVehicles;
