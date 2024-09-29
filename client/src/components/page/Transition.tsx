import React, { forwardRef, useMemo } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useRouter } from 'next/router'

type TransitionProps = HTMLMotionProps<'div'>
type TransitionRef = React.ForwardedRef<HTMLDivElement>

const onTheRight = { x: '100%' }
	const inTheCenter = { x: 0 }
	const onTheLeft = { x: '-100%' }

const pageConfig = {
    '/recipes': {
        initial: onTheLeft,
        animate: inTheCenter,
        exit: onTheLeft,
    },
    '/': {
        initial: onTheRight,
        animate: inTheCenter,
        exit: onTheRight,
    }
}

const Transition = ({ pathy, children, ...rest }: TransitionProps, ref: TransitionRef) => {
	const transition = { duration: 0.3, ease: 'easeInOut' }

	return (
		<motion.div
			ref={ref}
            style={{ maxHeight: '100%', overflowY: 'auto'}}
			{...pageConfig[pathy]}
			transition={transition}
			{...rest}
		>
			{children}
		</motion.div>
	)
}

export default forwardRef(Transition)