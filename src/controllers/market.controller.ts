import { Router, Request, Response, NextFunction } from "express";
import { Market } from "../entities/market.entity";
import AppDataSource from "../data/data-source";

interface IDataSelling {
  id: number;
  product_name: string;
  product_value: number;
  buyer: string;
  settled: boolean;
}


const validateFields = (requiredFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const missingFields: string[] = [];

    requiredFields.forEach(fields => {
      if(!req.body[fields]) {
        missingFields.push(fields)
      }
    })

    if(missingFields.length > 0) {
      return res.status(400).json({ message: `${missingFields.join(", ")} is a required field.` })
    }

    next();
  }
};

const validateById = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const sellings = await marketRepository.find();
    const hasId = sellings.map(item => item.id);
    
    if(!hasId.includes(parseInt(id))) {
      return res.status(404).json({ message: "Venda não encontrada" })
    }

    next();
  }
}

const router = Router();
const marketRepository = AppDataSource.getRepository(Market);
const requiredFields = ["product_name", "product_value"];

router.get("/", async (_, res: Response) => {
  const response = await marketRepository.find();

  return res.send(response);
})

router.get("/:id", validateById(), async (req: Request, res: Response) => {
  const { id } = req.params;
  const sellingById = await marketRepository.findOne({ where: { id: parseInt(id) } })

  return res.send(sellingById);
})

router.post("/create-selling", validateFields(requiredFields), async (req: Request, res: Response) => {
  const data: IDataSelling = req.body;
  const createSelling = marketRepository.create(data);

  await marketRepository.save(createSelling);

  return res.status(201).json({ message:'Venda realizada com sucesso.' });
})

router.patch("/update-selling/:id", validateById(), async (req: Request, res: Response) => {
  const { id } = req.params;
  const findSelling = await marketRepository.findOne({ where: { id: parseInt(id) } });

  findSelling.settled = true;

  await marketRepository.save(findSelling);

  return res.status(201).json({ message:"Venda atualizada com sucesso."});
})

router.delete("/delete-selling/:id", validateById(), async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteSelling = await marketRepository.findOne({ where: { id: parseInt(id) } });

  await marketRepository.delete(deleteSelling);

  return res.status(201).json({ message: "Venda excluída com sucesso." })
})

export default router;
