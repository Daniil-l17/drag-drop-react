import { DragEvent, useEffect, useState } from 'react';

const dragElement = [
	{ num: 1, id: 1 },
	{ num: 2, id: 2 },
	{ num: 3, id: 3 },
	{ num: 4, id: 4 }
];

interface Card {
	num: number;
	id: number;
}

function App() {
	const [dragArray, setDragArray] = useState<Card[]>([]);
	const [currentCard, setCurrentCard] = useState<Card>({} as Card);
	const [overCard, setOverCard] = useState<Card | null>(null);

	function dragStartHandler(item: Card) {
		setCurrentCard(item);
	}

	useEffect(() => {
		setDragArray(JSON.parse(localStorage.getItem('arrayDrag')!) ?? dragElement);
	}, []);

	useEffect(() => {
		if (dragArray.length) {
			localStorage.setItem('arrayDrag', JSON.stringify(dragArray));
		}
	}, [dragArray]);

	function dropDragHandler(e: DragEvent<HTMLDivElement>, item: Card) {
		e.preventDefault();
		setDragArray(prev =>
			[...prev].map(element => {
				if (element.id === item.id) {
					return { ...currentCard };
				}
				if (currentCard.id === element.id) {
					return { ...item };
				}
				return element;
			})
		);
		setOverCard(null);
	}

	function overDragHandler(e: DragEvent<HTMLDivElement>, item: Card) {
		e.preventDefault();
		setOverCard(item);
	}

	return (
		<div className='w-full min-h-[100vh] gap-6 flex justify-center items-center'>
			{dragArray.map(function (item) {
				return (
					<div
						onDragStart={() => dragStartHandler(item)}
						onDrop={e => dropDragHandler(e, item)}
						onDragOver={e => overDragHandler(e, item)}
						draggable={true}
						className={`w-[200px] ${overCard?.id === item.id ? 'bg-[#565656]' : ''} cursor-grab h-[300px] rounted-xl border-[1px] flex justify-center items-center border-[#747474cb]`}
						key={item.id}
					>
						<span className=' text-xl font-semibold'>{item.num}</span>
					</div>
				);
			})}
		</div>
	);
}

export default App;
