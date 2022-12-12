#! /usr/bin/env node

const fs = require("fs");
const path = require("path");
const { jtree } = require("jtree");
const { TreeNode } = jtree;
const content = fs.readFileSync("slr.tree", "utf8");

new TreeNode(content).forEach((entry) => {
	const Type = entry.get("Type");
	const Organ = entry.get("Organ");
	const Caption = entry.get("Caption");
	const Author = entry.get("Author");
	const URL = entry.get("URL");

	const file = `import header.scroll
title ${Type} - ${Organ}
description ${Caption}
date 12/12/2022
author ${URL} ${Author}

openGraphImage ${URL}

image ${URL}
 caption ${Caption}

groups index
scrollFooter`;

	const permalink = jtree.Utils.stringToPermalink(
		[Type, Organ, Author].join(".")
	);

	const filePath = path.join(__dirname, `${permalink}.scroll`);
	fs.writeFileSync(filePath, file, "utf8");
});
