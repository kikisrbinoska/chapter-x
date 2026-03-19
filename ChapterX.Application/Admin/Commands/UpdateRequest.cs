using MediatR;

namespace ChapterX.Application.Admin.Commands
{
    public record UpdateRequest(int Id, int UserId) : IRequest<UpdateResponse>;
}
