import { Test } from '@nestjs/testing';
import { KudosService } from './kudos.service';
import { KudosController } from './kudos.controller';
import { PrismaService } from '../core-services/prisma.service';
import { EmailService } from '../core-services/email.service';
import { UserService } from '../(user)/user/user.service';

describe('Kudos Test suite', () => {
  let kudoController: KudosController;
  let kudoService: KudosService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [KudosController],
      providers: [KudosService, PrismaService, EmailService, UserService],
    }).compile();

    kudoService = moduleRef.get<KudosService>(KudosService);
    kudoController = moduleRef.get<KudosController>(KudosController);
  });

  describe('getAllKudos', () => {
    it('should return an array of kudos', async () => {
      const result = [
        {
          companyId: 'clxt7g1pe00006ir1fe32fmkk',
          createdAt: new Date('2024-06-24T16:41:33.296Z'),
          deletedAt: null,
          id: 'clxt7g5m8000w6ir1tqbi8jtr',
          isAnonymous: false,
          isHidden: false,
          likes: 0,
          message: 'Degero trado tristis apostolus.',
          receiverId: 'clxt7g1tw00046ir1644ce5ij',
          senderId: 'clxt7g1s300026ir1icrjjahq',
          title: 'Hand - Kub',
          updatedAt: new Date('2024-06-24T16:41:33.296Z'),
        },
      ];
      jest
        .spyOn(kudoService, 'getAllKudos')
        .mockImplementation(async () => result);
      expect(await kudoController.findAll({})).toEqual(result);
    });
  });

  describe('getKudoById', () => {
    it('should return a kudo', async () => {
      const result = {
        companyId: 'clxt7g1pe00006ir1fe32fmkk',
        createdAt: new Date('2024-06-24T16:41:33.296Z'),
        deletedAt: null,
        id: 'clxt7g5m8000w6ir1tqbi8jtr',
        isAnonymous: false,
        isHidden: false,
        likes: 0,
        message: 'Degero trado tristis apostolus.',
        receiverId: 'clxt7g1tw00046ir1644ce5ij',
        senderId: 'clxt7g1s300026ir1icrjjahq',
        title: 'Hand - Kub',
        updatedAt: new Date('2024-06-24T16:41:33.296Z'),
      };
      jest
        .spyOn(kudoService, 'getKudoById')
        .mockImplementation(async () => result);
      expect(
        await kudoController.findKudoById('clxt7g5m8000w6ir1tqbi8jtr'),
      ).toEqual(result);
    });
  });

  describe('createKudo', () => {
    it('should create a kudo', async () => {
      const result = {
        companyId: 'clxt7g1pe00006ir1fe32fmkk',
        createdAt: new Date('2024-06-24T16:41:33.296Z'),
        deletedAt: null,
        id: 'clxt7g5m8000w6ir1tqbi8jtr',
        isAnonymous: false,
        isHidden: false,
        likes: 0,
        message: 'Degero trado tristis apostolus.',
        receiverId: 'clxt7g1tw00046ir1644ce5ij',
        senderId: 'clxt7g1s300026ir1icrjjahq',
        title: 'Hand - Kub',
        updatedAt: new Date('2024-06-24T16:41:33.296Z'),
      };
      jest
        .spyOn(kudoService, 'createKudo')
        .mockImplementation(async () => result);
      expect(
        await kudoController.createKudo({
          companyId: 'clxt7g1pe00006ir1fe32fmkk',
          isAnonymous: false,
          message: 'Degero trado tristis apostolus.',
          receiverId: 'clxt7g1tw00046ir1644ce5ij',
          senderId: 'clxt7g1s300026ir1icrjjahq',
          title: 'Hand - Kub',
        }),
      ).toEqual(result);
    });
  });

  describe('updateKudo', () => {
    it('should update a kudo', async () => {
      const result = {
        companyId: 'clxt7g1pe00006ir1fe32fmkk',
        createdAt: new Date('2024-06-24T16:41:33.296Z'),
        deletedAt: null,
        id: 'clxt7g5m8000w6ir1tqbi8jtr',
        isAnonymous: false,
        isHidden: false,
        likes: 0,
        message: 'Degero trado tristis apostolus.',
        receiverId: 'clxt7g1tw00046ir1644ce5ij',
        senderId: 'clxt7g1s300026ir1icrjjahq',
        title: 'Hand - Kub',
        updatedAt: new Date('2024-06-24T16:41:33.296Z'),
      };
      jest
        .spyOn(kudoService, 'updateKudoById')
        .mockImplementation(async () => result);
      expect(
        await kudoController.updateKudo('clxt7g5m8000w6ir1tqbi8jtr', {
          companyId: 'clxt7g1pe00006ir1fe32fmkk',
          isAnonymous: false,
          message: 'Degero trado tristis apostolus.',
          receiverId: 'clxt7g1tw00046ir1644ce5ij',
          senderId: 'clxt7g1s300026ir1icrjjahq',
          title: 'Hand - Kub',
        }),
      ).toEqual(result);
    });
  });

  describe('deleteKudo', () => {
    it('should delete a kudo', async () => {
      const result = {
        companyId: 'clxt7g1pe00006ir1fe32fmkk',
        createdAt: new Date('2024-06-24T16:41:33.296Z'),
        deletedAt: new Date('2024-06-24T16:41:33.296Z'),
        id: 'clxt7g5m8000w6ir1tqbi8jtr',
        isAnonymous: false,
        isHidden: false,
        likes: 0,
        message: 'Degero trado tristis apostolus.',
        receiverId: 'clxt7g1tw00046ir1644ce5ij',
        senderId: 'clxt7g1s300026ir1icrjjahq',
        title: 'Hand - Kub',
        updatedAt: new Date('2024-06-24T16:41:33.296Z'),
      };
      jest
        .spyOn(kudoService, 'softDeleteKudoById')
        .mockImplementation(async () => result);
      expect(
        await kudoController.deleteKudo('clxt7g5m8000w6ir1tqbi8jtr'),
      ).toEqual(result);
    });
  });
});
