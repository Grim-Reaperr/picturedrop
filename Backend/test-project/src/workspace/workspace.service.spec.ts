import { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import { WorkspaceService } from "./workspace.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Workspace } from "./entities/workspace.entity";

describe('calculator', () => {

    it('should add two', () => {
        const result = 4 + 2;
        expect(result).toBe(6);
    });
});

describe('WorkspaceService', () => {

    let service: WorkspaceService;

    let mockRepo:{
        find: jest.Mock;
    }

   beforeEach(async () => {

        mockRepo = {
            find: jest.fn(),
        };
        const module: TestingModule = await Test.createTestingModule({
            providers: [WorkspaceService,{
                 provide: getRepositoryToken(Workspace), 
                 useValue: mockRepo }
                ],
        }).compile();

        service = module.get<WorkspaceService>(WorkspaceService);
    });

describe('sumFunction', () => {
    it('should add number', () => {
        const result = service.sumFunction(3, 4);
        expect(result).toBe(7);
    });


    it('should throw an error', () => {
        expect(() => service.sumFunction(2, NaN)).toThrow('Nan is not a number');
    });

})

describe('findAll', () => {
    it('should return an array of workspaces', async () => {
        const mockWorkspaces = [
            { Id: 1, SubscriptionStatus: 'Active' },
            { Id: 2, SubscriptionStatus: 'Canceled' },
        ];

        mockRepo.find.mockReturnValue(mockWorkspaces)

        const result = await service.findAll();
       console.log(result);
        expect(result).toHaveLength(2);
        expect(result).toEqual(mockWorkspaces)
        expect(result[0]).toHaveProperty('Id')
        expect(result[0]).toHaveProperty('SubscriptionStatus')
        expect(result[0]).toEqual({
            Id: 1,
            SubscriptionStatus: 'Active'
        });
    });

})



});
