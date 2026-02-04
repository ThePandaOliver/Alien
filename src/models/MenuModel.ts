export interface MenuData {
	id: number;
	name: string;
	img: string;
	description: MenuDescription;
}

export interface MenuDescription {
	paragraph: string;
	content: MenuContentSection[];
}

export interface MenuContentSection {
	headline?: string;
	text: string;
}