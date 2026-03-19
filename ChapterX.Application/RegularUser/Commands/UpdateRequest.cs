using MediatR;

namespace ChapterX.Application.RegularUser.Commands
{
    public record UpdateRequest(int Id, int UserId) : IRequest<UpdateResponse>;
}
