import React, { Suspense, PureComponent, LazyExoticComponent, ComponentType } from 'react'
import PageLoader from '../PageLoader'
export default function BundleComponent(Comp: LazyExoticComponent<ComponentType>) {
    return class Sus extends PureComponent {
        render() {
            return (
                <Suspense fallback={<PageLoader />}>
                    <Comp />
                </Suspense>
            )
        }
    }
}
