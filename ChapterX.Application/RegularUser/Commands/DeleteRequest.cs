using MediatR;

namespace ChapterX.Application.RegularUser.Commands
{
    public record DeleteRequest(int Id) : IRequest<DeleteResponse>;
}
