/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { __experimentalToolsPanel as ToolsPanel, SelectControl } from '@wordpress/components';

import Headphones from '../../assets/headphones.svg';
import Play from '../../assets/player-play.svg';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit() {
	const [ icon, setIcon ] = useState( Headphones );

    return (
		<div { ...useBlockProps() }>
			<InspectorControls key="setting">
				<ToolsPanel>
					<SelectControl
						label="Icon"
						value={ icon }
						options={ [
							{ label: 'Headphones', value: Headphones },
							{ label: 'Play', value: Play },
						] }
						onChange={ ( newIcon ) => setIcon( newIcon ) }
						__nextHasNoMarginBottom
					/>
				</ToolsPanel>
			</InspectorControls>
			<button id="menu-button">
				<img id="menu-icon" src={icon} style={{ borderRadius: '50%' }} />
			</button>
		</div>
    );
}
