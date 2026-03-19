using MediatR;

namespace ChapterX.Application.Roles.Commands
{
    public record UpdateRequest(int Id) : IRequest<UpdateResponse>;
}
