import styles from '../../styles/components/Plan.module.scss';
import ComboComponent from './ComboComponent';

export default function PlanComponent({ speed, unit, price, best, wifi, games, movies }) {
    const combos = (
        <div class="flex justify-center">
            <ul role="list" className={`${styles.comboList} mb-8 space-y-4 text-left my-8`}>
                {wifi ?
                    <ComboComponent combo="Wifi" colorClass={`${best ? styles.bestColor : styles.defaultColor}`} />
                    : ''
                }
                {games ?
                    <ComboComponent combo="Games" colorClass={`${best ? styles.bestColor : styles.defaultColor}`} />
                    : ''
                }
                {movies ?
                    <ComboComponent combo="Canais de Filmes" colorClass={`${best ? styles.bestColor : styles.defaultColor}`} />
                    : ''
                }
            </ul>
        </div>
    );

    const bestPlan = (
        <div className={`${styles.best} flex flex-col mx-auto max-w-lg text-center bg-white rounded-lg border mb-8`}>
            <span class="">
                Melhor Plano
            </span>
        </div >
    );

    return (
        <div>
            <div className={`${styles.plan} ${best ? styles.bestPlan : ''} flex flex-col p-6 mx-auto max-w-lg text-center bg-white rounded-lg border xl:p-8`}>
                {best ? bestPlan : ''}
                <h3 className={`${styles.speed} ${best ? styles.bestColor : styles.defaultColor} mb-4 text-2xl font-semibold`}>
                    {speed}
                </h3>
                <p className={`${styles.unit} font-light sm:text-lg font-semibold`}>
                    {unit}
                </p>
                {combos}
                <div className={`flex justify-center items-baseline ${styles.price}`}>
                    <span className={`mr-2 text-5xl font-extrabold`}>R$ {price}</span>
                    <span>/mês</span>
                </div>
                <div className="flex justify-center">
                    <button className={`text-white ${styles.btnContract} font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-8 ${styles.started}`}>
                        Contrate Já
                    </button>
                </div>
            </div>
        </div>
    )
}