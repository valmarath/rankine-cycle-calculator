import * as C from './styles';

export const FluidInput = ( {setFluid, label} ) => {

    return (
        <C.Container>
            <C.Label>
                {label}
            </C.Label>
            <C.Select defaultValue="Water" onChange={e => setFluid(e.target.value)}>
                <option value="Air">Air</option>
                <option value="1-Butene">1-Butene</option>
                <option value="Acetone">Acetone</option>
                <option  value="Ammonia">Ammonia</option>
                <option value="Argon">Argon</option>
                <option value="Benzene">Benzene</option>
                <option value="CarbonDioxide">CarbonDioxide</option>
                <option value="CarbonMonoxide">CarbonMonoxide</option>
                <option value="CarbonylSulfide">CarbonylSulfide</option>
                <option value="CycloHexane">CycloHexane</option>
                <option value="CycloPropane">CycloPropane</option>
                <option value="Cyclopentane">Cyclopentane</option>
                <option value="D4">D4</option>
                <option value="D5">D5</option>
                <option value="D6">D6</option>
                <option value="Deuterium">Deuterium</option>
                <option value="Dichloroethane">Dichloroethane</option>
                <option value="DiethylEther">DiethylEther</option>
                <option value="DimethylCarbonate">DimethylCarbonate</option>
                <option value="DimethylEther">DimethylEther</option>
                <option value="Ethane">Ethane</option>
                <option value="Ethanol">Ethanol</option>
                <option value="EthylBenzene">EthylBenzene</option>
                <option value="Ethylene">Ethylene</option>
                <option value="EthyleneOxide">EthyleneOxide</option>
                <option value="Fluorine">Fluorine</option>
                <option value="HFE143m">HFE143m</option>
                <option value="HeavyWater">HeavyWater</option>
                <option value="Helium">Helium</option>
                <option value="Hydrogen">Hydrogen</option>
                <option value="HydrogenChloride">HydrogenChloride</option>
                <option value="HydrogenSulfide">HydrogenSulfide</option>
                <option value="IsoButane">IsoButane</option>
                <option value="IsoButene">IsoButene</option>
                <option value="Isohexane">Isohexane</option>
                <option value="Isopentane">Isopentane</option>
                <option value="Krypton">Krypton</option>
                <option value="MD2M">MD2M</option>
                <option value="MD3M">MD3M</option>
                <option value="MD4M">MD4M</option>
                <option value="MDM">MDM</option>
                <option value="MM">MM</option>
                <option value="Methane">Methane</option>
                <option value="Methanol">Methanol</option>
                <option value="MethylLinoleate">MethylLinoleate</option>
                <option value="MethylLinolenate">MethylLinolenate</option>
                <option value="MethylOleate">MethylOleate</option>
                <option value="MethylPalmitate">MethylPalmitate</option>
                <option value="MethylStearate">MethylStearate</option>
                <option value="Neon">Neon</option>
                <option value="Neopentane">Neopentane</option>
                <option value="Nitrogen">Nitrogen</option>
                <option value="NitrousOxide">NitrousOxide</option>
                <option value="Novec649">Novec649</option>
                <option value="OrthoDeuterium">OrthoDeuterium</option>
                <option value="OrthoHydrogen">OrthoHydrogen</option>
                <option value="Oxygen">Oxygen</option>
                <option value="ParaDeuterium">ParaDeuterium</option>
                <option value="ParaHydrogen">ParaHydrogen</option>
                <option value="Propylene">Propylene</option>
                <option value="Propyne">Propyne</option>
                <option value="R11">R11</option>
                <option value="R113">R113</option>
                <option value="R114">R114</option>
                <option value="R115">R115</option>
                <option value="R116">R116</option>
                <option value="R12">R12</option>
                <option value="R123">R123</option>
                <option value="R1233zd(E)">R1233zd(E)</option>
                <option value="R1234yf">R1234yf</option>
                <option value="R1234ze(E)">R1234ze(E)</option>
                <option value="R1234ze(Z)">R1234ze(Z)</option>
                <option value="R124">R124</option>
                <option value="R125">R125</option>
                <option value="R13">R13</option>
                <option value="R134a">R134a</option>
                <option value="R13I1">R13I1</option>
                <option value="R14">R14</option>
                <option value="R141b">R141b</option>
                <option value="R142b">R142b</option>
                <option value="R143a">R143a</option>
                <option value="R152A">R152A</option>
                <option value="R161">R161</option>
                <option value="R21">R21</option>
                <option value="R218">R218</option>
                <option value="R22">R22</option>
                <option value="R227EA">R227EA</option>
                <option value="R23">R23</option>
                <option value="R236EA">R236EA</option>
                <option value="R236FA">R236FA</option>
                <option value="R245ca">R245ca</option>
                <option value="R245fa">R245fa</option>
                <option value="R32">R32</option>
                <option value="R365MFC">R365MFC</option>
                <option value="R40">R40</option>
                <option value="R404A">R404A</option>
                <option value="R407C">R407C</option>
                <option value="R41">R41</option>
                <option value="R410A">R410A</option>
                <option value="R507A">R507A</option>
                <option value="RC318">RC318</option>
                <option value="SES36">SES36</option>
                <option value="SulfurDioxide">SulfurDioxide</option>
                <option value="SulfurHexafluoride">SulfurHexafluoride</option>
                <option value="Toluene">Toluene</option>
                <option value="Water">Water</option>
                <option value="Xenon">Xenon</option>
                <option value="cis-2-Butene">cis-2-Butene</option>
                <option value="m-Xylene">m-Xylene</option>
                <option value="n-Butane">n-Butane</option>
                <option value="n-Decane">n-Decane</option>
                <option value="n-Dodecane">n-Dodecane</option>
                <option value="n-Heptane">n-Heptane</option>
                <option value="n-Hexane">n-Hexane</option>
                <option value="n-Nonane">n-Nonane</option>
                <option value="n-Octane">n-Octane</option>
                <option value="n-Pentane">n-Pentane</option>
                <option value="n-Propane">n-Propane</option>
                <option value="n-Undecane">n-Undecane</option>
                <option value="o-Xylene">o-Xylene</option>
                <option value="p-Xylene">p-Xylene</option>
                <option value="trans-2-Butene">trans-2-Butene</option>
            </C.Select>
        </C.Container>
    )
}