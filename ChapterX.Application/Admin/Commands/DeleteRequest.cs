using MediatR;

namespace ChapterX.Application.Admin.Commands
{
    public record DeleteRequest(int Id) : IRequest<DeleteResponse>;
}
